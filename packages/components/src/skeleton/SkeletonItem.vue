<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Variant } from "./types";
import SIcon from "../icon/Icon.vue";

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
  <div :class="classes">
    <SIcon v-if="variant === 'image'" fill="#4C4D4F" name="image" width="30%" height="30%"></SIcon>
    <slot name="default"></slot>
  </div>
</template>

<style lang="scss">
.su-skeleton-item {
  display: inline-block;
  width: 100%;
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
    height: 20px;
  }

  &--image {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  &--circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
</style>
