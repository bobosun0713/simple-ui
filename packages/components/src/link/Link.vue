<script setup lang="ts">
import { computed, PropType } from "vue";
import type { LinkType, LinkTarget } from "./types";

defineOptions({
  name: "SLink"
});

const props = defineProps({
  type: { type: String as PropType<LinkType>, default: "default" },
  href: { type: String, default: "" },
  underline: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  target: { type: String as PropType<LinkTarget>, default: "_self" }
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
@import "./style/index.scss";
</style>
