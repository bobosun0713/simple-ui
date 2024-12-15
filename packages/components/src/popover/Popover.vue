<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { StyleValue } from "vue";
import { onClickOutside } from "@vueuse/core";

import { PopoverProps, PopoverTrigger } from "./types";
import {
  autoUpdate,
  useFloating,
  flip,
  shift,
  limitShift,
  offset as floatingOffset,
  arrow as floatingArrow
} from "@floating-ui/vue";

defineOptions({
  name: "SPopover2"
});

const {
  content = undefined,
  offset = 0,
  hasArrow = true,
  placement = "bottom",
  trigger: propsTrigger = "click"
} = defineProps<PopoverProps>();

const modelValue = defineModel("modelValue", { type: Boolean, default: false });

const isVisible = ref(modelValue.value);
const popoverRef = ref<HTMLElement | null>(null);
const popoverContentRef = ref<HTMLElement | null>(null);
const popoverArrowRef = ref<HTMLElement | null>(null);

const {
  floatingStyles,
  middlewareData,
  placement: floatingPlacement
} = useFloating(popoverRef, popoverContentRef, {
  open: modelValue,
  placement: () => placement,
  whileElementsMounted: autoUpdate,
  middleware: () => [
    floatingOffset(Math.max(offset, 0) + (!hasArrow ? 0 : 5)),
    flip(),
    shift({
      limiter: limitShift()
    }),
    ...(hasArrow ? [floatingArrow({ element: popoverArrowRef, padding: 0 })] : [])
  ]
});

const arrowStyle = computed<StyleValue>(() => {
  const { arrow } = middlewareData.value;
  if (!arrow) return arrow;

  const side = floatingPlacement.value as string;
  const arrowX = arrow.x ? `${arrow.x}px` : "";
  const arrowY = arrow.y ? `${arrow.y}px` : "";

  const rotation = {
    top: "",
    left: "rotate(-90deg)",
    bottom: "rotate(180deg)",
    right: "rotate(90deg)"
  }[side];

  return {
    position: "absolute",
    left: arrowX,
    top: arrowY,
    transform: rotation,
    [side]: "100%"
  };
});

function withTrigger(cb: () => void, trigger: PopoverTrigger): void {
  if (!(propsTrigger || []).includes(trigger)) return;
  cb();
}

function handleToggle(val: boolean): void {
  isVisible.value = val;
  modelValue.value = val;
}

function handleMouseover(val: boolean): void {
  withTrigger(() => handleToggle(val), "hover");
}

function handleClick(val: boolean): void {
  withTrigger(() => handleToggle(val), "click");
}

onClickOutside(
  popoverContentRef,
  () => {
    handleToggle(false);
  },
  {
    ignore: [popoverRef]
  }
);

watch(modelValue, val => {
  isVisible.value = val;
});
</script>

<template>
  <div
    ref="popoverRef"
    class="su-popover"
    @click="handleClick(!isVisible)"
    @mouseenter="handleMouseover(true)"
    @mouseleave="handleMouseover(false)"
  >
    <slot name="default"></slot>

    <Teleport to="body">
      <Transition name="fade">
        <div v-show="isVisible" ref="popoverContentRef" :style="floatingStyles" class="su-popover__content">
          <template v-if="$slots.content">
            <slot name="content"></slot>
          </template>
          <template v-else>
            {{ content }}
          </template>

          <div v-if="hasArrow" ref="popoverArrowRef" class="su-popover__arrow" :style="arrowStyle"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
