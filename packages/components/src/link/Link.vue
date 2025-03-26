<script setup lang="ts">
import { computed } from "vue";
import type { LinkProps } from "./types";

defineOptions({
  name: "SLink"
});

const props = withDefaults(defineProps<LinkProps>(), {
  type: "default",
  href: "",
  underline: true,
  disabled: false,
  target: "_self"
});

const classes = computed(() => {
  return {
    "su-link": true,
    [`su-link--${props.type}`]: true,
    "su-link--underline": props.underline,
    "su-link--disabled": props.disabled
  };
});
</script>

<template>
  <a :class="classes" :href="disabled || !href ? undefined : href" :target="disabled || !href ? undefined : target">
    <slot name="default"></slot>
  </a>
</template>

<style lang="scss">
@use "./style/index.scss";
</style>
