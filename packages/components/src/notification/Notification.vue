<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { notificationDefault } from "./Notification";
import SIcon from "../icon/Icon.vue";
import type { NotificationProps } from "./types";

defineOptions({
  name: "SNotification"
});

const props = withDefaults(defineProps<NotificationProps>(), notificationDefault);

const visible = ref(false);
let timer: number;

const verticalDirection = computed(() => (/bottom/.test(props.position) ? "bottom" : "top"));
const verticalOffsetTop = computed(() => `${verticalDirection.value}:${props.offsetTop}px;`);
const horizontalDirection = computed(() => (/right/.test(props.position) ? "right" : "left"));
const selectAnimation = computed(() =>
  horizontalDirection.value.includes("right") ? "notificationR" : "notificationL"
);

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
  <transition :name="selectAnimation" @after-leave="onClear">
    <div
      v-show="visible"
      class="su-notification"
      :class="[horizontalDirection, type && `su-notification--${type}`]"
      :style="verticalOffsetTop"
    >
      <div v-if="title" class="su-notification__header">
        <div class="su-notification__title" v-html="title"></div>
      </div>

      <button v-if="showClose" type="button" class="su-notification__cancel" @click="onClose">
        <SIcon name="close"></SIcon>
      </button>

      <div class="su-notification__body" v-html="message"></div>
    </div>
  </transition>
</template>

<style lang="scss">
@use "./style";
</style>
