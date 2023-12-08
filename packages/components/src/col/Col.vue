<script setup lang="ts">
import { inject, computed, type Ref } from "vue";

defineOptions({
  name: "SCol"
});

const gutter = inject("gutter") as Ref<number>;

const props = defineProps({
  col: {
    type: [String, Number],
    default: 3
  }
});

const styles = computed(() => {
  const col = props.col as number;
  return {
    paddingLeft: `${gutter.value}px`,
    paddingRight: `${gutter.value}px`,
    width: col % 12 ? `calc(${col / 12} * 100%)` : "100%"
  };
});
</script>

<template>
  <div class="su-col" :style="styles">
    <slot name="default"> </slot>
  </div>
</template>
