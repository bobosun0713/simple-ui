a
<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "SAside"
});

const props = defineProps({
  width: {
    type: String,
    default: "250"
  }
});

const style = computed(() => `width: ${props.width}px;`);
</script>

<template>
  <aside class="su-aside" :style>
    <slot />
  </aside>
</template>

<style lang="scss" scoped>
.su-aside {
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
