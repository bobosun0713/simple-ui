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
import { computed, ref, watch } from "vue";

import type { PopperArrowData, PopperProps, PopperEmits, PopperSlots, PopperTrigger } from "./types";

defineOptions({
  name: "SPopper"
});

const props = withDefaults(defineProps<PopperProps>(), {
  modelValue: false,
  content: undefined,
  offset: 0,
  placement: "bottom",
  allowPlacement: undefined,
  transition: "su-popper-fade",
  trigger: "click",
  appendToBody: true,
  arrowOptions: undefined,
  hasShift: undefined
});

const emits = defineEmits<PopperEmits>();

const slots = defineSlots<PopperSlots>();

const isVisible = ref(props.modelValue);
const referenceRef = ref<HTMLDivElement | null>(null);
const popperRef = ref<HTMLDivElement | null>(null);

const {
  floatingStyles,
  middlewareData,
  placement: floatingPlacement
} = useFloating(referenceRef, popperRef, {
  open: props.modelValue,
  placement: () => props.placement,
  whileElementsMounted: autoUpdate,

  middleware: () => [
    floatingOffset(Math.max(props.offset, 0)),
    flip({
      /* v8 ignore next 3 */
      ...(props.allowPlacement && {
        fallbackPlacements: Array.isArray(props.allowPlacement) ? props.allowPlacement : [props.allowPlacement]
      })
    }),
    ...(props.hasShift ? [shift({ limiter: limitShift() })] : []),
    ...(props.arrowOptions ? [floatingArrow(props.arrowOptions)] : [])
  ]
});

const arrowData = computed<PopperArrowData>(() => {
  const arrowResult = {
    style: {},
    placement: floatingPlacement.value
  };

  const { arrow } = middlewareData.value;
  if (!arrow) return arrowResult;
  const [side] = floatingPlacement.value.split("-") as [PopperProps["placement"]];

  arrowResult.style = {
    position: "absolute",
    /* v8 ignore next 2 */
    left: arrow.x ? `${arrow.x}px` : "",
    top: arrow.y ? `${arrow.y}px` : "",
    ...(side && { [side]: "100%" })
  };

  if (side) arrowResult.placement = side;

  return arrowResult;
});

const bindTrigger = (cb: () => void, trigger: PopperTrigger): void => {
  if (!props.trigger.includes(trigger)) return;
  cb();
};

const handleToggle = (val: boolean): void => {
  isVisible.value = val;
  emits("update:modelValue", isVisible.value);
};

const handleMouseover = (val: boolean): void => {
  bindTrigger(() => {
    handleToggle(val);
  }, "hover");
};

const handleClick = (val: boolean): void => {
  bindTrigger(() => {
    handleToggle(val);
  }, "click");
};

onClickOutside(
  popperRef,
  () => {
    handleToggle(false);
  },
  {
    ignore: [referenceRef]
  }
);

watch(
  () => props.modelValue,
  val => (isVisible.value = val)
);
</script>

<template>
  <div
    ref="referenceRef"
    :class="['su-popper-reference', $attrs.class]"
    @click="handleClick(!isVisible)"
    @mouseenter="handleMouseover(true)"
    @mouseleave="handleMouseover(false)"
  >
    <slot name="reference"></slot>
  </div>

  <template v-if="(slots.content || content) && slots.reference">
    <Teleport to="body" :disabled="!appendToBody">
      <Transition :name="transition">
        <div v-show="isVisible" ref="popperRef" :style="floatingStyles" class="su-popper">
          <slot name="content" :arrow-style="arrowData.style" :placement="arrowData.placement">{{ content }}</slot>
        </div>
      </Transition>
    </Teleport>
  </template>
</template>
