<script setup lang="ts">
import { computed } from "vue";
import type { ColProps } from "./types";

defineOptions({
  name: "SCol"
});

const { col = 3, gutter = 0 } = defineProps<ColProps>();

const styles = computed(() => ({
  paddingLeft: `${gutter}px`,
  paddingRight: `${gutter}px`,
  width: col % 12 ? `calc(${col / 12} * 100%)` : "100%"
}));
</script>

<template>
  <div class="su-col" :style="styles">
    <slot name="default"> </slot>
  </div>
</template>
