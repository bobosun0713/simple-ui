<script lang="ts" setup>
import { ref, computed } from "vue";
import { notificationDefault } from "./props";
import notificationBus from "./bus";
import NotificationMessage from "./NotificationMessage.vue";
import type { NotificationProps } from "./types";

defineOptions({
  name: "SNotification"
});
notificationBus.$on("toast-add", openHandler);
notificationBus.$on("toast-remove-all", removeAllHandler);

const props = withDefaults(defineProps<NotificationProps>(), notificationDefault);

const notification = ref<NotificationProps[]>([]);
const notificationIdx = ref(0);

const verticalDirection = computed(() => (/bottom/.test(props.position) ? "bottom" : "top"));
const horizontalDirection = computed(() => (/right/.test(props.position) ? "right" : "left"));
const animationType = computed(() =>
  horizontalDirection.value.includes("right") ? "notification-right" : "notification-left"
);

function openHandler(data: object): void {
  let result = { id: notificationIdx.value, ...data };
  notificationIdx.value += 1;

  if (verticalDirection.value === "bottom") notification.value.unshift(result);
  else notification.value.push(result);
}
function removeHandler(idx: string | number) {
  const findIdx = notification.value.findIndex(item => item.id === idx);
  notification.value.splice(findIdx, 1);
}
function removeAllHandler() {
  notification.value = [];
}
</script>

<template>
  <transition-group
    :name="animationType"
    mode="out-in"
    tag="div"
    class="su-notification"
    :class="[horizontalDirection, verticalDirection]"
  >
    <NotificationMessage
      v-for="note in notification"
      :id="note.id"
      :key="note.id"
      :type="note.type"
      :summary="note.summary"
      :message="note.message"
      :duration="note.duration"
      :slots="$slots.default"
      :style="`margin-bottom:${props.spacing}px`"
      @on-close="removeHandler"
    ></NotificationMessage>
  </transition-group>
</template>

<style lang="scss">
@use "./style";
</style>
