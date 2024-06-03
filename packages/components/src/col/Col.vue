<script setup lang="ts">
import { inject, computed } from "vue";
import type { ColProps } from "./types";

defineOptions({
  name: "SCol"
});

const props = withDefaults(defineProps<ColProps>(), {
  col: 3
});

const gutter = inject<number>("gutter");

const styles = computed(() => ({
  paddingLeft: `${gutter}px`,
  paddingRight: `${gutter}px`,
  width: props.col % 12 ? `calc(${props.col / 12} * 100%)` : "100%"
}));
</script>

<template>
  <div class="su-col" :style="styles">
    <slot name="default"> </slot>
  </div>
</template>
