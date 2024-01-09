<script lang="ts" setup>
import { ref, computed, useSlots, nextTick, watch } from "vue";
import { useElementBounding, useWindowSize } from "@vueuse/core";
import { tooltipProps } from "./types";
import type { TooltipPlacement, TooltipTrigger, TooltipEventName } from "./types";

defineOptions({
  name: "STooltip"
});

const props = defineProps(tooltipProps);

const emits = defineEmits(["update:modelValue"]);
const slots = useSlots();

const isVisible = ref(false);
const top = ref(0);
const left = ref(0);
const tooltipRef = ref<HTMLDivElement | null>(null);
const tooltipContentRef = ref<HTMLDivElement | null>(null);
const tooltipContentWidth = ref(0);
const triedPlacements = new Set();
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

  const commonTopValue = Number(tooltipY.value + (tooltipHeight.value - contentHeight.value) / 2);
  const commonLeftValue = Number(tooltipX.value + (tooltipWidth.value - tooltipContentWidth.value) / 2);

  const placementMap = {
    top() {
      left.value = commonLeftValue;
      top.value = Number(tooltipY.value - contentHeight.value) - Number(props.offset);
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
  const edges = [
    { name: "top", condition: () => top.value <= 0, opposite: "bottom" },
    { name: "left", condition: () => left.value <= 0, opposite: "right" },
    {
      name: "right",
      condition: () => left.value + tooltipContentWidth.value >= windowWidth.value,
      opposite: "left"
    },
    { name: "bottom", condition: () => top.value >= windowHeight.value, opposite: "top" }
  ];

  const touchEdge = edges.find(edge => edge.condition());

  if (touchEdge) {
    currentPlacement.value = touchEdge.opposite;

    if (triedPlacements.size >= 2) {
      calcPlacementPos(touchEdge.opposite as TooltipPlacement);
      triedPlacements.clear();
      return;
    }

    calcPlacementPos(touchEdge.opposite as TooltipPlacement);
    triedPlacements.add(touchEdge.opposite);

    nextTick(() => {
      checkTouchEdge();
    });
  }
}
function onMouseIn(): void {
  isVisible.value = true;
  emits("update:modelValue", true);

  handlePlacement();
}
function onMouseOut(): void {
  isVisible.value = false;
  emits("update:modelValue", false);

  handlePlacement();
}
function onToggle(): void {
  isVisible.value = !isVisible.value;
  emits("update:modelValue", isVisible.value);

  handlePlacement();
}

function handlePlacement(): void {
  nextTick(() => {
    calcPlacementPos(props.placement);
    checkTouchEdge();
  });
}
function handleTooltipEvent(event: TooltipTrigger, currentEvent: TooltipTrigger, eventName: TooltipEventName): void {
  if (event !== currentEvent) return;

  const events = {
    in: onMouseIn,
    out: onMouseOut,
    click: onToggle
  };

  events[eventName]?.();
}

watch(
  () => props.modelValue,
  () => {
    currentPlacement.value = props.placement;
    isVisible.value = props.modelValue;
    handlePlacement();
  },
  { immediate: true }
);

watch(
  () => windowWidth.value,
  () => handlePlacement()
);
</script>

<template>
  <div ref="tooltipRef" class="su-tooltip">
    <div
      class="su-tooltip__trigger"
      @click="handleTooltipEvent('click', trigger, 'click')"
      @mouseenter="handleTooltipEvent('hover', trigger, 'in')"
      @mouseleave="handleTooltipEvent('hover', trigger, 'out')"
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
