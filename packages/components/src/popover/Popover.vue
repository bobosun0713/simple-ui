<script setup lang="ts">
import { ref } from "vue";

import type { PopoverProps } from "./types";
import SPopper from "../popper/Popper.vue";

defineOptions({
  name: "SPopover"
});

const {
  content = undefined,
  offset = 0,
  placement = "bottom",
  allowPlacement = undefined,
  transition = "su-popper-fade",
  trigger = "click",
  appendToBody = true,
  hasShift = undefined
} = defineProps<PopoverProps>();

const popoverArrowRef = ref<HTMLElement | null>(null);
</script>

<template>
  <SPopper
    :offset="Math.max(0, offset + 6)"
    :transition
    :placement
    :allow-placement
    :trigger
    :append-to-body
    :has-shift
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
