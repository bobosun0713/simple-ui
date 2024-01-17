<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Variant } from "./types";

defineOptions({
  name: "SkeletonItem"
});

const props = defineProps({
  variant: {
    type: String as PropType<Variant>,
    default: "p"
  }
});

const classes = computed(() => [
  "su-skeleton-item",
  "su-skeleton-item--paragraph",
  {
    [`su-skeleton-item--${props.variant}`]: props.variant
  }
]);
</script>

<template>
  <div :class="classes"><slot></slot></div>
</template>

<style lang="scss">
.su-skeleton-item {
  display: inline-block;
  width: 100%;
  height: 14px;
  background: #ededed;
  border-radius: 4px;

  &--paragraph:not(:first-child) {
    margin-top: 12px;
  }

  &--first {
    width: 33%;
  }
  &--last {
    width: 66%;
  }

  &--p {
    height: 14px;
  }

  &--h {
    height: 18px;
  }

  &--image {
  }

  &--button {
  }
}
</style>
