<script lang="ts" setup>
import { computed } from "vue";
import type { TooltipProps, TooltipEmits } from "./types";
import SPopper from "../popper/Popper.vue";

defineOptions({
  name: "STooltip"
});

const props = withDefaults(defineProps<TooltipProps>(), {
  content: undefined,
  offset: 0,
  placement: "bottom",
  allowPlacement: undefined,
  transition: "su-fade",
  trigger: "hover",
  appendToBody: true,
  hasShift: true
});

const emits = defineEmits<TooltipEmits>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits("update:modelValue", value)
});
</script>

<template>
  <SPopper
    v-model="modelValue"
    :offset="Math.max(0, offset + 4)"
    :transition="transition"
    :placement="placement"
    :allow-placement="allowPlacement"
    :trigger="trigger"
    :append-to-body="appendToBody"
    :has-shift="hasShift"
  >
    <template #reference>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.content || content" #content>
      <div class="su-tooltip">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
  </SPopper>
</template>

<style lang="scss">
@use "./style";
</style>
