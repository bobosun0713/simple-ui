<script setup lang="ts">
import { provide, ref, computed, watch } from "vue";

defineOptions({
  name: "SGrid"
});

const props = defineProps({
  col: {
    type: [String, Number],
    default: 3
  },
  gap: {
    type: [String, Number],
    default: 0
  }
});

watch(
  () => [props.col, props.gap],
  () => {
    colCount.value = props.col;
    colGap.value = props.gap;
  }
);

const colCount = ref(props.col);
const colGap = ref(props.gap);

const styles = computed(() => ({ gap: `${colGap.value}px` }));

provide("col", colCount);
</script>

<template>
  <div class="su-grid" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
