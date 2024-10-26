<script lang="ts" setup>
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from "vue";
import { useWindowSize, useElementBounding } from "@vueuse/core";
import type { TooltipProps, TooltipPlacement } from "./types";

defineOptions({
  name: "STooltip"
});

const props = withDefaults(defineProps<TooltipProps>(), {
  modelValue: false,
  content: "Tooltip!",
  offset: 4,
  trigger: "hover",
  placement: "bottom"
});

const emits = defineEmits(["update:modelValue"]);

const isVisible = ref(false);
const tooltipRef = ref<HTMLElement | null>(null);
const tooltipContentRef = ref<HTMLElement | null>(null);
const tooltipContentRect = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0
});

const placementPos = computed(
  () => `transform: translate3d(${tooltipContentRect.value.left}px, ${tooltipContentRect.value.top}px, 0);`
);

const { width: windowWidth, height: windowHeight } = useWindowSize();

const {
  width: tooltipWidth,
  height: tooltipHeight,
  y: tooltipY,
  x: tooltipX,
  update: updateTooltip
} = useElementBounding(tooltipRef);

function calcPlacementPos(placement: TooltipPlacement): void {
  // Update tooltip position
  updateTooltip();

  const { width: contentWidth = 0, height: contentHeight = 0 } = tooltipContentRef.value?.getBoundingClientRect() ?? {};

  tooltipContentRect.value.width = contentWidth;
  tooltipContentRect.value.height = contentHeight;

  const commonTopValue = window.scrollY + tooltipY.value + (tooltipHeight.value - tooltipContentRect.value.height) / 2;
  const commonLeftValue = tooltipX.value + (tooltipWidth.value - tooltipContentRect.value.width) / 2;

  const placementMap = {
    top(): void {
      tooltipContentRect.value.left = commonLeftValue;
      tooltipContentRect.value.top =
        window.scrollY + tooltipY.value - tooltipContentRect.value.height - Number(props.offset);
    },
    right(): void {
      tooltipContentRect.value.left = tooltipX.value + tooltipWidth.value + Number(props.offset);
      tooltipContentRect.value.top = commonTopValue;
    },
    bottom(): void {
      tooltipContentRect.value.left = commonLeftValue;
      tooltipContentRect.value.top = window.scrollY + tooltipY.value + tooltipHeight.value + Number(props.offset);
    },
    left(): void {
      tooltipContentRect.value.left = tooltipX.value - tooltipContentRect.value.width - Number(props.offset);
      tooltipContentRect.value.top = commonTopValue;
    }
  };

  placementMap[placement]?.();
}
function checkTouchEdge(): void {
  const isTouchLeft = tooltipContentRect.value.left <= 0;
  const isTouchRight = tooltipContentRect.value.left + tooltipContentRect.value.width >= windowWidth.value;
  const isTouchTop = tooltipContentRect.value.top - window.scrollY <= 0;
  const isTouchBottom =
    tooltipContentRect.value.top - window.scrollY + tooltipContentRect.value.height >= windowHeight.value;

  const edges: {
    condition: boolean;
    placement: TooltipPlacement;
  }[] = [
    {
      condition: !isTouchRight && isTouchTop,
      placement: "bottom"
    },
    {
      condition: isTouchRight,
      placement: "left"
    },
    {
      condition: !isTouchRight && isTouchBottom,
      placement: "top"
    },
    { condition: isTouchLeft, placement: "right" }
  ];

  for (const edge of edges) {
    if (edge.condition) {
      calcPlacementPos(edge.placement);
    }
  }
}

function isScrollContainer(ele: HTMLElement): boolean {
  const style = window.getComputedStyle(ele);
  const overflowRegex = /(auto|scroll)/;
  return overflowRegex.test(style.overflow);
}

function collectScroll(ele: HTMLElement): HTMLElement[] {
  const scrollList: HTMLElement[] = [];
  let current = ele?.parentElement;

  while (current) {
    if (isScrollContainer(current)) {
      scrollList.push(current);
    }
    current = current.parentElement;
  }

  return scrollList;
}

function handleToggle(): void {
  isVisible.value = !isVisible.value;
  emits("update:modelValue", isVisible.value);

  triggerPlacement();
}
function handleMouseover(visible: boolean): void {
  isVisible.value = visible;
  emits("update:modelValue", visible);

  triggerPlacement();
}

function triggerPlacement(): void {
  if (!isVisible.value) return;
  void nextTick(() => {
    calcPlacementPos(props.placement);
    checkTouchEdge();
  });
}

watch(
  () => props.modelValue,
  () => {
    isVisible.value = props.modelValue;
    triggerPlacement();
  },
  { immediate: true }
);

watch(windowWidth, () => triggerPlacement());

onMounted(() => {
  [window, ...collectScroll(tooltipRef.value!)].forEach(ele => {
    ele.addEventListener("scroll", triggerPlacement);
  });
});
onUnmounted(() => {
  [window, ...collectScroll(tooltipRef.value!)].forEach(ele => {
    ele.removeEventListener("scroll", triggerPlacement);
  });
});
</script>

<template>
  <div ref="tooltipRef" class="su-tooltip">
    <div
      class="su-tooltip__trigger"
      @click="handleToggle"
      @mouseenter="handleMouseover(true)"
      @mouseleave="handleMouseover(false)"
    >
      <slot name="default"></slot>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <div v-show="isVisible" ref="tooltipContentRef" :style="placementPos" class="su-tooltip__content">
          <template v-if="$slots.content">
            <slot name="content"></slot>
          </template>
          <template v-else>
            {{ content }}
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
