<script setup lang="ts">
import { inject, computed, type Ref } from "vue";

defineOptions({
  name: "SCol"
});

const gap = inject("gap") as Ref<number>;

const props = defineProps({
  col: {
    type: [String, Number],
    default: 3
  }
});

const styles = computed(() => {
  const col = props.col as number;
  return { width: col % 12 ? `calc(${col / 12} * (100% - ${gap.value}px))` : "100%" };
});
</script>

<template>
  <div class="su-col" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/reset";

.su-col {
  outline: 1px solid red;
}
</style>
