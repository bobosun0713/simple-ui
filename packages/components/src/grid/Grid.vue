<script setup lang="ts">
import { provide, ref, computed, watch, isRef } from "vue";
import { gridPropsKey, type GridProps } from "./types";

defineOptions({
  name: "SGrid"
});

const props = withDefaults(defineProps<GridProps>(), {
  col: 3,
  gap: 0
});

const col = ref(props.col);
const gap = ref(props.gap);

const styles = computed(() => ({ gap: `${gap.value}px` }));

watch(
  () => [props.col, props.gap],
  () => {
    col.value = isRef(props.col) ? props.col.value : props.col;
    gap.value = isRef(props.gap) ? props.gap.value : props.gap;
  }
);

provide(gridPropsKey, { col, gap });
</script>

<template>
  <div class="su-grid" :style="styles">
    <slot name="default"></slot>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
