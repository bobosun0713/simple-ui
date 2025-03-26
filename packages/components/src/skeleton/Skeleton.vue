<script setup lang="ts">
import SkeletonItem from "./SkeletonItem.vue";
import type { SkeletonProps } from "./types";

defineOptions({
  name: "SSkeleton"
});

const { rows = 2, loading = true, animated = true } = defineProps<SkeletonProps>();
</script>

<template>
  <div v-if="loading" class="su-skeleton">
    <slot name="template">
      <SkeletonItem class="su-skeleton-item--first" :animated variant="p"></SkeletonItem>
      <SkeletonItem
        v-for="item in rows"
        :key="item"
        :class="item === rows && rows > 1 ? 'su-skeleton-item--last' : ''"
        :animated
        variant="p"
      >
      </SkeletonItem>
    </slot>
  </div>

  <slot v-else name="default" v-on="$attrs"></slot>
</template>

<style lang="scss">
@use "./style";
</style>
