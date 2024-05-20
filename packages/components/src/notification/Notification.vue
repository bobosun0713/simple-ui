<script lang="ts" setup>
import { ref, computed } from "vue";
import NotificationContent from "./NotificationContent.vue";
import type { NotificationProps, NotificationContentProps } from "./types";

defineOptions({
  name: "SNotification"
});

const props = withDefaults(defineProps<NotificationProps>(), {
  width: 300,
  offsetTop: 10,
  eleSpacing: 10,
  duration: 3000,
  position: "top-right"
});

const notificationList = ref<NotificationContentProps[]>([]);
const notificationIdx = ref(0);

const verticalDirection = computed(() =>
  /bottom/.test(props.position) ? "su-notification-wrap--bottom" : "su-notification-wrap--top"
);
const horizontalDirection = computed(() =>
  /right/.test(props.position) ? "su-notification-wrap--right" : "su-notification-wrap--left"
);
const animationType = computed(() =>
  horizontalDirection.value.includes("right") ? "notification-right" : "notification-left"
);

function handleAdd(data: NotificationContentProps): void {
  if (notificationList.value.length === 0) notificationIdx.value = 0;

  notificationIdx.value += 1;
  const addItem = { ...data, id: notificationIdx.value };

  //@ts-ignore
  // TODO: FIx this issue with the type of notificationList (deep and possibly infinite.)
  if (verticalDirection.value === "su-notification-wrap--bottom") notificationList.value.push(addItem);
  else notificationList.value.unshift(addItem);
}

function handleRemove(idx: string | number): void {
  const findIdx = notificationList.value.findIndex(item => item.id === idx);
  if (findIdx !== -1) notificationList.value.splice(findIdx, 1);
}

function handleRemoveAll(): void {
  notificationList.value = [];
}

defineExpose({ handleAdd, handleRemoveAll });
</script>

<template>
  <TransitionGroup
    :name="animationType"
    mode="out-in"
    tag="div"
    :class="['su-notification-wrap', verticalDirection, horizontalDirection]"
    :style="`width:${width}px; top:${offsetTop}px;`"
  >
    <NotificationContent
      v-for="(notice, noticeIdx) in notificationList"
      :id="notice.id"
      :key="notice.id"
      :type="notice.type"
      :title="notice.title"
      :message="notice.message"
      :cancel="notice.cancel"
      :duration="duration"
      :style="noticeIdx !== 0 && `margin-top:${eleSpacing}px;`"
      @on-close="handleRemove"
    >
      <template #title>
        <slot name="title" :title="notice.title"></slot>
      </template>

      <template #message>
        <slot name="message" :message="notice.message"></slot>
      </template>

      <template #cancel>
        <slot name="cancel"></slot>
      </template>
    </NotificationContent>
  </TransitionGroup>
</template>

<style lang="scss">
@use "./style";
</style>
