<script setup lang="ts">
import { provide, computed, watch, ref } from "vue";
import { rowGutterKey, type RowProps } from "./types";

defineOptions({
  name: "SRow"
});

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0
});

const gutter = ref(props.gutter);

const classes = computed(() => [
  props.justify ? `su-row--justify-${props.justify}` : "",
  props.align ? `su-row--align-${props.align}` : ""
]);
const styles = computed(() => ({
  marginLeft: `-${gutter.value}px`,
  marginRight: `-${gutter.value}px`
}));

watch(
  () => props.gutter,
  val => {
    gutter.value = val;
  }
);

provide(rowGutterKey, gutter);
</script>

<template>
  <div class="su-row" :class="classes" :style="styles">
    <slot name="default"></slot>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
