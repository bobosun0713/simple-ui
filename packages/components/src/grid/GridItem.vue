<script setup lang="ts">
import { inject, computed, type Ref } from "vue";

defineOptions({
  name: "SGridItem"
});

const col = inject("col") as Ref<number>;

const styles = computed(() => ({ flex: `0 0 ${100 / col.value}%` }));
</script>

<template>
  <div class="su-grid-item" :style="styles">
    <slot>{{ col }}</slot>
  </div>
</template>
