<script setup lang="ts">
import { computed, useSlots, type Component } from "vue";
import { type RowProps } from "./types";

defineOptions({
  name: "SRow"
});

const { gutter = 0, align = "center" } = defineProps<RowProps>();

const slots = useSlots();

const rowClasses = computed(() => `su-row--${align}`);

const colItems = computed(() => slots.default?.().filter(slot => (slot.type as Component).name === "SCol") ?? []);
</script>

<template>
  <div :class="['su-row', rowClasses]">
    <template v-for="slot in colItems" :key="slot">
      <component :is="slot" :gutter></component>
    </template>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
