<script setup lang="ts">
import { onUnmounted, watch } from "vue";
import SIcon from "../icon/Icon.vue";

import { LoadingProps } from "./types";

defineOptions({
  name: "SLoading"
});

const visibleValue = defineModel("visible", {
  type: Boolean,
  default: false
});

const { duration = 2000 } = defineProps<LoadingProps>();

let timer: number;

watch(visibleValue, () => {
  if (!duration) return;

  if (timer) clearTimeout(timer);
  timer = window.setTimeout(() => {
    visibleValue.value = false;
  }, duration);
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
