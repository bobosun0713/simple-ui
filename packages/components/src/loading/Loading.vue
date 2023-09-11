<script lang="ts" setup>
import { ref, onUnmounted, watch } from "vue";
import SIcon from "../icon/Icon.vue";
import type { LoadingProps } from "./types";

defineOptions({
  name: "SLoading"
});

const props = defineProps<LoadingProps>();

const visible = ref(false);
let timer: number;

watch(visible, () => {
  if (timer) clearTimeout(timer);
  if (!props.duration) return;
  timer = window.setTimeout(() => {
    visible.value = false;
  }, props.duration);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

defineExpose({ visible });
</script>

<template>
  <transition name="loading">
    <div v-show="visible" class="su-loading">
      <template v-if="props.spinner">
        <div class="su-loading-content" v-html="props.spinner"></div>
      </template>
      <template v-else>
        <div class="su-loading-content">
          <slot>
            <SIcon name="loading" width="60" height="60" fill="#3e8ed0" class="su-loading-spinner"></SIcon>
          </slot>
        </div>
      </template>
    </div>
  </transition>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
