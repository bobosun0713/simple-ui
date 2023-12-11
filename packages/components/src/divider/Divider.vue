<script setup lang="ts">
import { computed, type PropType } from "vue";

import type { BorderStyle } from "./types";

defineOptions({
  name: "SDivider"
});

const props = defineProps({
  vertical: { type: Boolean, default: false },
  thickness: { type: [String, Number], default: 1 },
  spacing: { type: [String, Number], default: 24 },
  borderStyle: { type: String as PropType<BorderStyle>, default: "solid" }
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
@import "./style/index.scss";
</style>
