<script lang="ts" setup>
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from "vue";
import { useWindowSize } from "@vueuse/core";
import type { TooltipProps, TooltipPlacement } from "./types";

defineOptions({
  name: "STooltip"
});

const props = withDefaults(defineProps<TooltipProps>(), {
  modelValue: false,
  content: "Tooltip!",
  offset: 4,
  trigger: "hover",
  placement: "top"
});

const emits = defineEmits(["update:modelValue"]);

const isVisible = ref(false);
const tooltipRef = ref<HTMLElement | null>(null);
const tooltipContentRef = ref<HTMLElement | null>(null);
const tooltipContentTop = ref(0);
const tooltipContentLeft = ref(0);
const tooltipContentWidth = ref(0);
const tooltipContentHeight = ref(0);
const currentPlacement = ref("");

const placementPos = computed(() => `inset:${tooltipContentTop.value}px auto auto ${tooltipContentLeft.value}px;`);

const { width: windowWidth, height: windowHeight } = useWindowSize();

function calcPlacementPos(placement: TooltipPlacement): void {
  const {
    width: tooltipWidth = 0,
    height: tooltipHeight = 0,
    y: tooltipY = 0,
    x: tooltipX = 0
  } = tooltipRef.value?.getBoundingClientRect() ?? {};

  const { width: contentWidth = 0, height: contentHeight = 0 } = tooltipContentRef.value?.getBoundingClientRect() ?? {};

  tooltipContentWidth.value = contentWidth ?? 0;
  tooltipContentHeight.value = contentHeight ?? 0;

  const commonTopValue = window.scrollY + tooltipY + (tooltipHeight - tooltipContentHeight.value) / 2;
  const commonLeftValue = tooltipX + (tooltipWidth - tooltipContentWidth.value) / 2;

  const placementMap = {
    top(): void {
      tooltipContentLeft.value = commonLeftValue;
      tooltipContentTop.value = window.scrollY + tooltipY - tooltipContentHeight.value - Number(props.offset);
    },
    right(): void {
      tooltipContentLeft.value = tooltipX + tooltipWidth + Number(props.offset);
      tooltipContentTop.value = commonTopValue;
    },
    bottom(): void {
      tooltipContentLeft.value = commonLeftValue;
      tooltipContentTop.value = window.scrollY + tooltipY + tooltipHeight + Number(props.offset);
    },
    left(): void {
      tooltipContentLeft.value = tooltipX - tooltipContentWidth.value - Number(props.offset);
      tooltipContentTop.value = commonTopValue;
    }
  };

  placementMap[placement]?.();
}
function checkTouchEdge(): void {
  currentPlacement.value = props.placement;

  const edges: {
    condition: boolean;
    placement: TooltipPlacement;
  }[] = [
    { condition: tooltipContentTop.value - window.scrollY <= 0, placement: "bottom" },
    { condition: tooltipContentLeft.value <= 0, placement: "right" },
    { condition: tooltipContentLeft.value + tooltipContentWidth.value >= windowWidth.value, placement: "left" },
    {
      condition: tooltipContentTop.value - window.scrollY + tooltipContentHeight.value >= windowHeight.value,
      placement: "top"
    }
  ];

  for (const edge of edges) {
    if (edge.condition) {
      calcPlacementPos(edge.placement);
      currentPlacement.value = edge.placement;
      return;
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
        <div
          v-show="isVisible"
          ref="tooltipContentRef"
          :style="placementPos"
          :data-placement="currentPlacement"
          class="su-tooltip__content"
        >
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
