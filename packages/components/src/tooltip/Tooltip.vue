<script lang="ts" setup>
import { ref, computed } from "vue";
import type { TooltipProps } from "./types";

defineOptions({
  name: "STooltip"
});

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  showArrow: true
});

const isVisible = ref(false);

const classesContent = computed(() => [
  "su-tooltip__content",
  `su-tooltip__content--${props.placement}`,
  !props.showArrow ? "su-tooltip__content--disabled-arrow" : ""
]);

function handleMouseToggle() {
  isVisible.value = !isVisible.value;
}
</script>

<template>
  <div class="su-tooltip">
    <div class="su-tooltip__trigger" @mouseenter="handleMouseToggle" @mouseleave="handleMouseToggle">
      <slot name="default"></slot>
    </div>
    <transition name="fade">
      <div v-show="isVisible && (content || $slots.content)" :class="classesContent">
        <slot name="content">{{ content }}</slot>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
