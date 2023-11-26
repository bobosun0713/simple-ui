<script lang="ts" setup>
import { onUnmounted, watch } from "vue";
import SIcon from "../icon/Icon.vue";
import type { LoadingProps } from "./types";

defineOptions({
  name: "SLoading"
});

const props = withDefaults(defineProps<LoadingProps>(), {
  duration: 2000,
  appendToBody: false
});

const emits = defineEmits(["update:visible"]);

let timer: number;

watch(
  () => props.visible,
  () => {
    if (!props.duration) return;
    if (timer) clearTimeout(timer);

    timer = window.setTimeout(() => {
      emits("update:visible", false);
    }, props.duration);
  },
  {
    immediate: true
  }
);

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="loading">
      <div v-show="visible" class="su-loading">
        <div class="su-loading-content">
          <slot name="spinner">
            <SIcon name="loading" width="60" height="60" fill="#3e8ed0" class="su-loading-spinner"></SIcon>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
