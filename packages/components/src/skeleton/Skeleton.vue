<script setup lang="ts">
import { computed } from "vue";
import SkeletonItem from "./SkeletonItem.vue";
import type { SkeletonProps } from "./types";

defineOptions({
  name: "SSkeleton"
});

const props = withDefaults(defineProps<SkeletonProps>(), {
  rows: 2,
  loading: true,
  animated: true
});

const classes = computed(() => [
  "su-skeleton",
  {
    "su-skeleton--loading": props.animated
  }
]);
</script>

<template>
  <template v-if="loading">
    <div :class="classes">
      <slot name="template">
        <SkeletonItem class="su-skeleton-item--first" variant="p"></SkeletonItem>
        <SkeletonItem
          v-for="item in rows"
          :key="item"
          :class="item === rows && rows > 1 ? 'su-skeleton-item--last' : ''"
          variant="p"
        >
        </SkeletonItem>
      </slot>
    </div>
  </template>
  <template v-else>
    <slot name="default" v-on="$attrs"></slot>
  </template>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
