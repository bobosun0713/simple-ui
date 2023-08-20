<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import type { LoadingProps } from "./types";
import SIcon from "../icon/Icon.vue";

defineOptions({
  name: "SLoading"
});

const props = withDefaults(defineProps<LoadingProps>(), {
  visible: false
});

const isLoading = ref(false);
let timer: number;

watch(
  () => props.visible,
  val => {
    if (val) isLoading.value = true;
    else isLoading.value = false;
    if (props.timer) setTimer();
  }
);

onMounted(() => {
  isLoading.value = props.visible;
});

const setTimer = () => {
  clearInterval(timer);
  timer = window.setTimeout(() => {
    isLoading.value = false;
  }, props.timer);
};
</script>

<template>
  <transition name="loading">
    <div v-show="isLoading" class="su-loading">
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
