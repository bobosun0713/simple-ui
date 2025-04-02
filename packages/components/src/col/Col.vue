<script setup lang="ts">
import { computed } from "vue";
import type { ColProps } from "./types";

defineOptions({
  name: "SCol"
});

const props = withDefaults(defineProps<ColProps>(), {
  col: 3,
  gutter: 0
});

const styles = computed(() => ({
  paddingLeft: `${props.gutter}px`,
  paddingRight: `${props.gutter}px`,
  width: props.col % 12 ? `calc(${props.col / 12} * 100%)` : "100%"
}));
</script>

<template>
  <div class="su-col" :style="styles">
    <slot name="default"> </slot>
  </div>
</template>
