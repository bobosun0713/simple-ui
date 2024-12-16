<script setup lang="ts">
import {
  arrow as floatingArrow,
  autoUpdate,
  flip,
  limitShift,
  offset as floatingOffset,
  shift,
  useFloating
} from "@floating-ui/vue";
import { onClickOutside } from "@vueuse/core";
import { computed, ref, type StyleValue, watch } from "vue";

import type { PopupProps, PopupTrigger, PopupSlots } from "./types";

const modelValue = defineModel("modelValue", { type: Boolean, default: false });

const {
  content = undefined,
  arrowOptions = undefined,
  offset = 0,
  placement = "bottom",
  transition = "su-popup-fade",
  trigger: propsTrigger = "click"
} = defineProps<PopupProps>();

const slots = defineSlots<PopupSlots>();

const isVisible = ref(modelValue.value);
const referenceRef = ref<HTMLElement | null>(null);
const popupRef = ref<HTMLElement | null>(null);

const {
  floatingStyles,
  middlewareData,
  placement: floatingPlacement
} = useFloating(referenceRef, popupRef, {
  open: modelValue,
  placement: () => placement,
  whileElementsMounted: autoUpdate,
  middleware: () => [
    floatingOffset(Math.max(offset, 0)),
    flip(),
    shift({
      limiter: limitShift()
    }),
    ...(arrowOptions ? [floatingArrow(arrowOptions)] : [])
  ]
});

const arrowStyle = computed<StyleValue>(() => {
  const { arrow } = middlewareData.value;
  if (!arrow) return arrow;

  const side = floatingPlacement.value as string;
  const arrowX = arrow.x ? `${arrow.x}px` : "";
  const arrowY = arrow.y ? `${arrow.y}px` : "";

  return {
    position: "absolute",
    left: arrowX,
    top: arrowY,
    [side]: "100%"
  };
});

function bindTrigger(cb: () => void, trigger: PopupTrigger): void {
  if (!propsTrigger.includes(trigger)) return;
  cb();
}

function handleToggle(val: boolean): void {
  isVisible.value = val;
  modelValue.value = val;
}

function handleMouseover(val: boolean): void {
  bindTrigger(() => {
    handleToggle(val);
  }, "hover");
}

function handleClick(val: boolean): void {
  bindTrigger(() => {
    handleToggle(val);
  }, "click");
}

onClickOutside(
  popupRef,
  () => {
    handleToggle(false);
  },
  {
    ignore: [referenceRef]
  }
);

watch(modelValue, val => {
  isVisible.value = val;
});
</script>

<template>
  <div
    ref="referenceRef"
    class="su-popup-reference"
    @click="handleClick(!isVisible)"
    @mouseenter="handleMouseover(true)"
    @mouseleave="handleMouseover(false)"
  >
    <slot name="reference"></slot>
  </div>

  <template v-if="slots.content || content">
    <Teleport to="body">
      <Transition :name="transition">
        <div v-show="isVisible" ref="popupRef" :style="floatingStyles" class="jx-popup">
          <slot name="content" :arrow-style="arrowStyle" :placement="floatingPlacement">{{ content }}</slot>
        </div>
      </Transition>
    </Teleport>
  </template>
</template>

<style lang="scss">
@use "./style";
</style>
