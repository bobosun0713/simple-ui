<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "SSkeleton"
});

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: true
  }
});

const classes = computed(() => [
  "su-skeleton",
  {
    "su-skeleton--loading": props.animated
  }
]);
</script>

<template>
  <template v-if="!loading">
    <div :class="classes">
      <div class="su-skeleton-item">test</div>
    </div>
  </template>
  <template v-else>
    <slot name="default" v-on="$attrs"></slot>
  </template>
</template>

<style lang="scss">
.su-skeleton {
  &--loading &-item {
    background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 60%
      )
      #ededed;
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1.4s skeleton-loading ease infinite;
  }
}

.su-skeleton-item {
  width: 100%;
  height: 50px;
  background: #ededed;
  border-radius: 4px;
  animation: pulse 1s infinite;
}

// .su-skeleton-item--loading {
//   background: linear-gradient(45deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 60%)
//     #ededed;
//   background-size: 200% 100%;
//   background-position-x: 180%;
//   animation: 1.4s skeleton-loading ease infinite;
// }

@keyframes skeleton-loading {
  to {
    background-position-x: -5%;
  }
}
</style>
