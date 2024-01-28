<script lang="ts" setup>
import { ref, computed, useSlots, nextTick, watch, onMounted, onUnmounted } from "vue";
import { useElementBounding, useWindowSize } from "@vueuse/core";
import { tooltipProps } from "./types";
import type { TooltipPlacement } from "./types";

defineOptions({
  name: "STooltip"
});

const props = defineProps(tooltipProps);

const emits = defineEmits(["update:modelValue"]);
const slots = useSlots();

const isVisible = ref(false);
const top = ref(0);
const left = ref(0);
const tooltipRef = ref<HTMLElement | null>(null);
const tooltipContentRef = ref<HTMLElement | null>(null);
const tooltipContentWidth = ref(0);
const tooltipContentHeight = ref(0);
const currentPlacement = ref("");

const { width: windowWidth, height: windowHeight } = useWindowSize();

const placementPos = computed(() => `top:${top.value}px;left:${left.value}px;`);

function calcPlacementPos(placement: TooltipPlacement): void {
  const boundingOptions = { windowResize: false, windowScroll: false };
  const {
    width: tooltipWidth,
    height: tooltipHeight,
    y: tooltipY,
    x: tooltipX
  } = useElementBounding(tooltipRef as unknown as HTMLDivElement, boundingOptions);
  const { width: contentWidth, height: contentHeight } = useElementBounding(
    tooltipContentRef as unknown as HTMLDivElement,
    boundingOptions
  );

  tooltipContentWidth.value = contentWidth.value;
  tooltipContentHeight.value = contentHeight.value;

  const commonTopValue = Number(tooltipY.value + (tooltipHeight.value - tooltipContentHeight.value) / 2);
  const commonLeftValue = Number(tooltipX.value + (tooltipWidth.value - tooltipContentWidth.value) / 2);

  const placementMap = {
    top() {
      left.value = commonLeftValue;
      top.value = Number(tooltipY.value - tooltipContentHeight.value) - Number(props.offset);
    },
    right() {
      left.value = Number(tooltipX.value + tooltipWidth.value) + Number(props.offset);
      top.value = commonTopValue;
    },
    bottom() {
      left.value = commonLeftValue;
      top.value = Number(tooltipY.value + tooltipHeight.value) + Number(props.offset);
    },
    left() {
      left.value = Number(tooltipX.value - tooltipContentWidth.value) - Number(props.offset);
      top.value = commonTopValue;
    }
  };

  placementMap[placement]?.();
}
function checkTouchEdge(): void {
  // Touch the top edge
  if (top.value <= 0) {
    currentPlacement.value = "bottom";
    calcPlacementPos("bottom");
    return;
  }

  // Touch the left edge
  if (left.value <= 0) {
    currentPlacement.value = "right";
    calcPlacementPos("right");
    return;
  }

  // Touch the right edge
  if (left.value + tooltipContentWidth.value >= windowWidth.value) {
    currentPlacement.value = "left";
    calcPlacementPos("left");
    return;
  }

  // Touch the bottom edge
  if (top.value >= windowHeight.value) {
    currentPlacement.value = "top";
    calcPlacementPos("top");
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
  nextTick(() => {
    calcPlacementPos(props.placement);
    checkTouchEdge();
  });
}

watch(
  () => props.modelValue,
  () => {
    currentPlacement.value = props.placement;
    isVisible.value = props.modelValue;
    triggerPlacement();
  },
  { immediate: true }
);

watch(
  () => windowWidth.value,
  () => triggerPlacement()
);

onMounted(() => {
  [window, ...collectScroll(tooltipRef.value as HTMLElement)].forEach(ele => {
    ele.addEventListener("scroll", triggerPlacement);
  });
});
onUnmounted(() => {
  [window, ...collectScroll(tooltipRef.value as HTMLElement)].forEach(ele => {
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
          <template v-if="slots.content">
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
