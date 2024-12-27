<script lang="ts" setup>
import type { TooltipProps } from "./types";
import SPopper from "../popper/Popper.vue";

defineOptions({
  name: "STooltip"
});

const {
  content = undefined,
  offset = 0,
  placement = "bottom",
  allowPlacement = undefined,
  transition = "su-fade",
  trigger = "hover",
  appendToBody = true,
  hasShift = true
} = defineProps<TooltipProps>();
</script>

<template>
  <SPopper
    :offset="Math.max(0, offset + 4)"
    :transition
    :placement
    :allow-placement
    :trigger
    :append-to-body
    :has-shift
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
