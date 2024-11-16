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
    <SIcon v-if="variant === 'image'" fill="#4C4D4F" name="image" width="30%" height="30%"></SIcon>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
