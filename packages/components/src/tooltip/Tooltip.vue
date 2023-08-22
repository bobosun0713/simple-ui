<script lang="ts" setup>
import { ref, computed } from "vue";
import type { TooltipProps } from "./types";

defineOptions({
  name: "STooltip"
});

const props = withDefaults(defineProps<TooltipProps>(), {
  position: "top",
  showArrow: true
});

const isActive = ref(false);
const content = ref<HTMLElement | null>(null);

const classes = computed(() => [
  "su-tooltip-content",
  `su-tooltip-content--${props.position}`,
  !props.showArrow ? "su-tooltip-content--disabled-arrow" : ""
]);

const onHoverHandler = async () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <div class="su-tooltip">
    <transition name="fade">
      <div v-show="(isActive && props.label) || (isActive && $slots.content)" ref="content" :class="classes">
        <slot name="content">{{ label }}</slot>
      </div>
    </transition>
    <div class="su-tooltip-trigger" @mouseenter="onHoverHandler" @mouseleave="onHoverHandler">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
