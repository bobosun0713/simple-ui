<script setup lang="ts">
import { ref, computed } from "vue";

import type { PopoverProps, PopoverEmits } from "./types";
import SPopper from "../popper/Popper.vue";

defineOptions({
  name: "SPopover"
});

const props = withDefaults(defineProps<PopoverProps>(), {
  modelValue: false,
  content: undefined,
  offset: 0,
  placement: "bottom",
  allowPlacement: undefined,
  transition: "su-popper-fade",
  trigger: "click",
  appendToBody: true,
  hasShift: undefined
});

const emits = defineEmits<PopoverEmits>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits("update:modelValue", value)
});

const popoverArrowRef = ref<HTMLElement | null>(null);
</script>

<template>
  <SPopper
    v-model="modelValue"
    :offset="Math.max(0, offset + 6)"
    :transition="transition"
    :placement="placement"
    :allow-placement="allowPlacement"
    :trigger="trigger"
    :append-to-body="appendToBody"
    :has-shift="hasShift"
    :arrow-options="{ element: popoverArrowRef, padding: 5 }"
  >
    <template #reference>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.content || content" #content="{ arrowStyle, placement: PopperPlacement }">
      <div class="su-popover">
        <slot name="content"></slot>
        <div
          ref="popoverArrowRef"
          :class="['su-popover__arrow', `su-popover__arrow--${PopperPlacement}`]"
          :style="arrowStyle"
        ></div>
      </div>
    </template>
  </SPopper>
</template>

<style lang="scss">
@use "./style";
</style>
