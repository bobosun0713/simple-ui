<script setup lang="ts">
import { computed } from "vue";
import type { DividerProps } from "./types";

defineOptions({
  name: "SDivider"
});

const props = withDefaults(defineProps<DividerProps>(), {
  vertical: false,
  thickness: 1,
  spacing: 24,
  borderStyle: "solid"
});

const directionClasses = computed(() => ({
  [props.vertical ? "su-divider--vertical" : "su-divider--horizontal"]: true
}));

const dividerStyle = computed(() => ({
  [props.vertical ? "border-right-width" : "border-top-width"]: `${props.thickness}px`,
  margin: props.vertical ? `0 ${props.spacing}px ` : `${props.spacing}px 0`,
  "border-style": props.borderStyle
}));
</script>

<template>
  <div class="su-divider" :class="directionClasses" :style="dividerStyle"></div>
</template>

<style lang="scss">
@use "./style";
</style>
