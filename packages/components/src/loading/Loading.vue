<script setup lang="ts">
import { onUnmounted, watch, computed } from "vue";
import SIcon from "../icon/Icon.vue";

import { LoadingProps, LoadingEmits } from "./types";

defineOptions({
  name: "SLoading"
});

const props = withDefaults(defineProps<LoadingProps>(), {
  duration: 2000
});

const emits = defineEmits<LoadingEmits>();

let timer: number;

const visibleValue = computed({
  get: () => props.visible,
  set: val => {
    emits("update:visible", val);
  }
});

watch(visibleValue, () => {
  if (!props.duration) return;
  if (timer) clearTimeout(timer);

  timer = window.setTimeout(() => {
    visibleValue.value = false;
  }, props.duration);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <Transition name="loading">
    <div v-show="visibleValue" class="su-loading">
      <div class="su-loading-content">
        <slot name="spinner">
          <SIcon name="loading" width="60" height="60" fill="#3e8ed0" class="su-loading-spinner"></SIcon>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@use "./style";
</style>
