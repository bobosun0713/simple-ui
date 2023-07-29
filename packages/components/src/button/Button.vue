<script lang="ts" setup>
import { computed } from "vue";
import type { ButtonProps } from "./Button";
defineOptions({
  name: "SButton"
});

const suClass = computed(() => [
  "su-button",
  `su-button-size-${props.size}`,
  props.type ? `su-button-${props.type}` : "",
  props.rounded ? `su-button-rounded-${props.size}` : "",
  props.outlined ? "su-button--outlined" : "",
  props.disabled ? "su-button--disabled" : ""
]);

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "info",
  size: "dft"
});
</script>

<template>
  <button type="button" :class="suClass">
    <div v-if="props.loading" :class="`su-button-loading-${props.size}`"></div>
    <slot>Button</slot>
  </button>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
