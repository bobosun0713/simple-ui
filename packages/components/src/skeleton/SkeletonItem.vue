<script setup lang="ts">
import { computed } from "vue";
import SIcon from "../icon/Icon.vue";
import type { SkeletonItemProps } from "./types";

defineOptions({
  name: "SkeletonItem"
});

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  variant: "p"
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
@import "./style/index.scss";
</style>
