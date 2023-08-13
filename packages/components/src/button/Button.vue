<script lang="ts" setup>
import { computed } from "vue";
import type { ButtonProps } from "./types";
defineOptions({
  name: "SButton"
});
const props = withDefaults(defineProps<ButtonProps>(), {
  type: "info",
  size: "dft"
});

const classes = computed(() => [
  "su-button",
  `su-button-size-${props.size}`,
  props.type ? `su-button-${props.type}` : "",
  props.rounded ? `su-button-rounded-${props.size}` : "",
  props.outlined ? "su-button--outlined" : "",
  props.disabled ? "su-button--disabled" : ""
]);
</script>

<template>
  <button type="button" :class="classes">
    <div v-if="props.loading" :class="`su-button-loading-${props.size}`"></div>
    <slot>Button</slot>
  </button>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
