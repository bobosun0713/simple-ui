<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { Component } from "vue";

defineOptions({
  name: "SContainer"
});

const isVertical = computed(() => {
  const slots = useSlots();

  if (slots?.default) {
    return slots.default()?.some(vnode => {
      const tag = (vnode.type as Component).name;
      return ["SHeader", "SFooter"].includes(tag ?? "");
    });
  }

  return false;
});
</script>

<template>
  <div :class="['su-container', { 'su-container--vertical': isVertical }]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.su-container {
  display: flex;
  flex: 1;
  min-width: 0;
  box-sizing: border-box;

  &--vertical {
    flex-direction: column;
  }
}
</style>
