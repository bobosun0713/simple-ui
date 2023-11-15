<script lang="ts" setup>
import { ref, computed, useSlots, nextTick, watch } from "vue";
import { useElementBounding, useWindowSize } from "@vueuse/core";
import type { TooltipProps, TooltipPlacement, TooltipTrigger } from "./types";

defineOptions({
  name: "STooltip"
});

const props = withDefaults(defineProps<TooltipProps>(), {
  modelValue: false,
  content: "Text",
  offset: 8,
  trigger: "hover",
  placement: "bottom"
});
const emits = defineEmits(["update:modelValue"]);
const slots = useSlots();

const isVisible = ref(false);
const top = ref(0);
const left = ref(0);
const tooltipRef = ref<HTMLDivElement | null>(null);
const tooltipContentRef = ref<HTMLDivElement | null>(null);
const triedPlacements = new Set();

const { width: windowWidth, height: windowHeight } = useWindowSize();

const placementPos = computed(() => `top:${top.value}px;left:${left.value}px;`);

function calcPlacementPos(placement: TooltipPlacement) {
  const boundingOptions = { windowResize: false, windowScroll: false };
  const {
    width: tooltipWidth,
    height: tooltipHeight,
    y: tooltipY,
    x: tooltipX
  } = useElementBounding(tooltipRef, boundingOptions);
  const { width: tooltipContentWidth, height: tooltipContentHeight } = useElementBounding(
    tooltipContentRef,
    boundingOptions
  );
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
function checkTouchEdge() {
  const tooltipContentWidth = tooltipContentRef.value!.getBoundingClientRect().width;

  const edges = [
    { name: "top", condition: () => top.value <= 0, opposite: "bottom" },
    { name: "left", condition: () => left.value <= 0, opposite: "right" },
    {
      name: "right",
      condition: () => left.value + tooltipContentWidth >= windowWidth.value,
      opposite: "left"
    },
    { name: "bottom", condition: () => top.value >= windowHeight.value, opposite: "top" }
  ];

  const touchEdge = edges.find(edge => edge.condition());

  if (touchEdge) {
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
function handleCalcPlacementPos() {
  nextTick(() => {
    calcPlacementPos(props.placement);
    checkTouchEdge();
  });
}
function handleToggle(trigger: TooltipTrigger, event: TooltipTrigger) {
  if (trigger === event) {
    isVisible.value = !isVisible.value;
    emits("update:modelValue", isVisible.value);
  }

  if (!isVisible.value) return;
  handleCalcPlacementPos();
}

watch(
  () => props.modelValue,
  () => {
    isVisible.value = props.modelValue;
    handleCalcPlacementPos();
  },
  { immediate: true }
);
watch(
  () => windowWidth.value,
  () => handleCalcPlacementPos()
);
</script>

<template>
  <div ref="tooltipRef" class="su-tooltip">
    <div
      class="su-tooltip__trigger"
      @click="handleToggle(trigger, 'click')"
      @mouseenter="handleToggle(trigger, 'hover')"
      @mouseleave="handleToggle(trigger, 'hover')"
    >
      <slot name="default"></slot>
    </div>
    <Teleport to="body">
      <transition name="fade">
        <div v-show="isVisible" ref="tooltipContentRef" :style="placementPos" class="su-tooltip__content">
          <template v-if="slots.content">
            <slot name="content"></slot>
          </template>
          <template v-else>
            {{ content }}
          </template>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
