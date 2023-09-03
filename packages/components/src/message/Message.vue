<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { messageDefault } from "./Message";
import SIcon from "../icon/Icon.vue";
import type { MessageProps } from "./types";

defineOptions({
  name: "SMessage"
});

const props = withDefaults(defineProps<MessageProps>(), messageDefault);

const visible = ref(false);
let timer: number;

const verticalStyle = computed(() => `top:${props.offsetTop}px;`);
const onLeave = () => props.onClear?.();

onMounted(() => {
  visible.value = true;
  if (!props.duration) return;
  if (timer) clearTimeout(timer);
  timer = window.setTimeout(() => {
    props.onClose?.();
  }, props.duration as number);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

defineExpose({ visible });
</script>

<template>
  <transition name="message" @after-leave="onLeave">
    <div v-show="visible" class="su-message" :class="`su-message--${props.type}`" :style="verticalStyle">
      <div class="su-message__content">
        {{ message }}
      </div>
      <button v-if="props.showClose" type="button" class="su-message__cancel" @click="props.onClose">
        <SIcon name="close" width="24" height="24"></SIcon>
      </button>
    </div>
  </transition>
</template>

<style lang="scss">
@use "./style";
</style>
