<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "SHeader"
});

const props = defineProps({
  height: {
    type: String,
    default: null
  }
});

const style = computed(() => `height: ${props.height}px;`);
</script>

<template>
  <header class="su-header" :style>
    <slot />
  </header>
</template>

<style lang="scss" scoped>
.su-header {
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
