<script setup lang="ts">
import { provide, ref, computed, watch } from "vue";
import type { GridProps } from "./types";

defineOptions({
  name: "SGrid"
});

const props = withDefaults(defineProps<GridProps>(), {
  col: 3,
  gap: 0
});

const colCount = ref(props.col);
const colGap = ref(props.gap);

const styles = computed(() => ({ gap: `${colGap.value}px` }));

watch(
  () => [props.col, props.gap],
  () => {
    colCount.value = props.col;
    colGap.value = props.gap;
  }
);

provide("gridProps", { col: colCount, gap: colGap });
</script>

<template>
  <div class="su-grid" :style="styles">
    <slot name="default"></slot>
  </div>
</template>

<style lang="scss">
@import "./style";
</style>
