<script setup lang="ts">
import { provide, ref, computed, watch, useSlots, onMounted } from "vue";

defineOptions({
  name: "SRow"
});

const props = defineProps({
  gap: {
    type: [String, Number],
    default: "start"
  },
  align: {
    type: String,
    default: "top"
  }
});

const slots = useSlots();

const currentRowTotal = ref(0);
const gap = ref(props.gap);

const styles = computed(() => ({
  gap: `${props.gap}px`
}));

watch(
  () => props.gap,
  val => {
    gap.value = val;
  }
);

onMounted(() => {
  currentRowTotal.value = slots.default
    ? slots?.default().reduce((acc: number, crr: any) => Number(crr.props!.col) + acc, 0)
    : 0;
});

provide("gap", gap);
</script>

<template>
  <div class="su-row" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "./styles";
</style>
