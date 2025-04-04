<script lang="ts" setup>
import { ref, computed } from "vue";
import NotificationContent from "./NotificationContent.vue";
import type { NotificationProps, NotificationSlots, NotificationExposeAction, NotificationContentProps } from "./types";

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

defineSlots<NotificationSlots>();

let notificationIdx = 0;
const notificationList = ref<NotificationContentProps[]>([]);

const verticalDirection = computed(() =>
  /bottom/.test(props.position) ? "su-notification-wrap--bottom" : "su-notification-wrap--top"
);
const horizontalDirection = computed(() =>
  /right/.test(props.position) ? "su-notification-wrap--right" : "su-notification-wrap--left"
);
const animationType = computed(() =>
  horizontalDirection.value.includes("right") ? "notification-right" : "notification-left"
);

const handleAdd = (data: NotificationContentProps): void => {
  if (notificationList.value.length === 0) notificationIdx = 0;

  notificationIdx += 1;
  data.id = notificationIdx;

  const aryMethod = verticalDirection.value === "su-notification-wrap--bottom" ? "unshift" : "push";
  //@ts-ignore
  notificationList.value[aryMethod](data);
};

const handleRemove = (data: string | number): void => {
  const findIdx = notificationList.value.findIndex(item => item.id === data);
  if (findIdx !== -1) notificationList.value.splice(findIdx, 1);
};

const handleRemoveAll = (): void => {
  notificationList.value = [];
};

defineExpose<NotificationExposeAction>({ handleAdd, handleRemoveAll });
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

      <template #cancel="{ handleClose }">
        <slot name="cancel" :handle-close="handleClose"></slot>
      </template>
    </NotificationContent>
  </TransitionGroup>
</template>

<style lang="scss">
@use "./style";
</style>
