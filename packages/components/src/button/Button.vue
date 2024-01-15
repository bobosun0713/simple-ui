<script lang="ts" setup>
import { computed, type PropType } from "vue";
import type { ButtonTypes, ButtonSizes } from "./types";

defineOptions({
  name: "SButton"
});

const props = defineProps({
  type: {
    type: String as PropType<ButtonTypes>,
    default: "info"
  },
  size: {
    type: String as PropType<ButtonSizes>,
    default: "md"
  },
  outlined: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
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
