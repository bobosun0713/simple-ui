<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "SFooter"
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
  <footer class="su-footer" :style>
    <slot />
  </footer>
</template>

<style lang="scss" scoped>
.su-footer {
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
