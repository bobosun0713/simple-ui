<script setup lang="ts">
import { ref } from "vue";

import SPopup from "../popper/Popper.vue";

const popoverArrowRef = ref<HTMLElement | null>(null);
</script>

<template>
  <SPopup :offset="6" :arrow-options="{ element: popoverArrowRef, padding: 5 }">
    <template #reference>
      <slot name="default"></slot>
    </template>
    <template #content="{ arrowStyle, placement }">
      <div class="su-popover">
        <slot name="content"></slot>
        {{ placement }}
        <div
          ref="popoverArrowRef"
          :class="['su-popover__arrow', `su-popover__arrow--${placement}`]"
          :style="arrowStyle"
        ></div>
      </div>
    </template>
  </SPopup>
</template>

<style lang="scss">
@use "./style";
</style>
