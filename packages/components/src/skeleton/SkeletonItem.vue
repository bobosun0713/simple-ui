<script setup lang="ts">
import SIcon from "../icon/Icon.vue";
import type { SkeletonItemProps } from "./types";

defineOptions({
  name: "SkeletonItem"
});

const { variant = "p", animated = true } = defineProps<SkeletonItemProps>();
</script>

<template>
  <div
    :class="[
      'su-skeleton-item',
      'su-skeleton-item--paragraph',
      `su-skeleton-item--${variant}`,
      {
        'su-skeleton-item--animated': animated
      }
    ]"
  >
    <SIcon v-if="variant === 'image'" name="image" width="40" height="40"></SIcon>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
