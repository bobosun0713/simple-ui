<script setup lang="ts">
import { inject, computed, isRef } from "vue";

defineOptions({
  name: "SGridItem"
});

const { col, gap }: { col?: string | number; gap?: string | number } = inject("gridProps") ?? {};

const styles = computed(() => {
  const currentCol = isRef(col) ? Number(col.value) : Number(col);
  const currentGap = isRef(gap) ? Number(gap.value) : Number(gap);
  return { width: currentCol ? `calc((100% - ${currentGap * (currentCol - 1)}px) / ${currentCol})` : "100%" };
});
</script>

<template>
  <div class="su-grid-item" :style="styles">
    <slot name="default">{{ col }}</slot>
  </div>
</template>
