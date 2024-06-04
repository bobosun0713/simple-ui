<script setup lang="ts">
import { inject, computed } from "vue";
import { rowGutterKey } from "../row/types";
import type { ColProps } from "./types";

defineOptions({
  name: "SCol"
});

const props = withDefaults(defineProps<ColProps>(), {
  col: 3
});

const gutter = inject(rowGutterKey);

const styles = computed(() => ({
  paddingLeft: `${gutter!.value}px`,
  paddingRight: `${gutter!.value}px`,
  width: props.col % 12 ? `calc(${props.col / 12} * 100%)` : "100%"
}));
</script>

<template>
  <div class="su-col" :style="styles">
    <slot name="default"> </slot>
  </div>
</template>
