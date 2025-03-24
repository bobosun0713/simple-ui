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
import { computed, ref } from "vue";

import type { PopperArrowData, PopperPlacement, PopperProps, PopperSlots, PopperTrigger } from "./types";

defineOptions({
  name: "SPopper"
});

const modelValue = defineModel<boolean>({ default: false });

const {
  content = undefined,
  offset = 0,
  placement = "bottom",
  allowPlacement = undefined,
  transition = "su-popper-fade",
  trigger: propsTrigger = "click",
  appendToBody = true,
  arrowOptions = undefined,
  hasShift = undefined
} = defineProps<PopperProps>();

const slots = defineSlots<PopperSlots>();

const referenceRef = ref<HTMLDivElement | null>(null);
const popperRef = ref<HTMLDivElement | null>(null);

const {
  floatingStyles,
  middlewareData,
  placement: floatingPlacement
} = useFloating(referenceRef, popperRef, {
  open: modelValue,
  placement: () => placement,
  whileElementsMounted: autoUpdate,

  middleware: () => [
    floatingOffset(Math.max(offset, 0)),
    flip({
      /* v8 ignore next 3 */
      ...(allowPlacement && { fallbackPlacements: Array.isArray(allowPlacement) ? allowPlacement : [allowPlacement] })
    }),
    ...(hasShift ? [shift({ limiter: limitShift() })] : []),
    ...(arrowOptions ? [floatingArrow(arrowOptions)] : [])
  ]
});

const arrowData = computed<PopperArrowData>(() => {
  const arrowResult = {
    style: {},
    placement: floatingPlacement.value
  };

  const { arrow } = middlewareData.value;
  if (!arrow) return arrowResult;
  const [side] = floatingPlacement.value.split("-") as [PopperPlacement];

  arrowResult.style = {
    position: "absolute",
    /* v8 ignore next 2 */
    left: arrow.x ? `${arrow.x}px` : "",
    top: arrow.y ? `${arrow.y}px` : "",
    [side]: "100%"
  };

  arrowResult.placement = side;

  return arrowResult;
});

function bindTrigger(cb: () => void, trigger: PopperTrigger): void {
  if (!propsTrigger.includes(trigger)) return;
  cb();
}

function handleToggle(val: boolean): void {
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
  popperRef,
  () => {
    handleToggle(false);
  },
  {
    ignore: [referenceRef]
  }
);
</script>

<template>
  <div
    ref="referenceRef"
    :class="['su-popper-reference', $attrs.class]"
    @click="handleClick(!modelValue)"
    @mouseenter="handleMouseover(true)"
    @mouseleave="handleMouseover(false)"
  >
    <slot name="reference"></slot>
  </div>

  <template v-if="(slots.content || content) && slots.reference">
    <Teleport to="body" :disabled="!appendToBody">
      <Transition :name="transition">
        <div v-show="modelValue" ref="popperRef" :style="floatingStyles" class="su-popper">
          <slot name="content" :arrow-style="arrowData.style" :placement="arrowData.placement">{{ content }}</slot>
        </div>
      </Transition>
    </Teleport>
  </template>
</template>
