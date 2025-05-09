<script lang="ts" setup>
import { computed, onMounted, onUnmounted, isVNode } from "vue";
import SIcon from "../icon/Icon.vue";
import type { NotificationContentProps, NotificationContentEmits } from "./types";

const props = withDefaults(defineProps<NotificationContentProps>(), {
  id: "",
  type: "info",
  title: "Tips",
  message: "Content",
  duration: 3000
});

const emits = defineEmits<NotificationContentEmits>();

let timer: number | null = null;

const classes = computed(() => ["su-notification", `su-notification--${props.type}`]);

const handleTimer = (): void => {
  if (!props.duration) return;
  timer = window.setTimeout(() => {
    emits("close", props.id);
  }, props.duration as number);
};

const handleClose = (id: string | number): void => {
  emits("close", id);
};

onMounted(() => {
  handleTimer();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div :class="classes">
    <div class="su-notification__content">
      <slot name="title">
        <component :is="title" v-if="isVNode(title)"></component>
        <div v-else class="su-notification__title">{{ title }}</div>
      </slot>

      <slot name="message">
        <component :is="message" v-if="isVNode(message)"></component>
        <div v-else class="su-notification__message">{{ message }}</div>
      </slot>
    </div>

    <slot name="cancel" :handle-close="handleClose.bind(null, id!)">
      <component :is="cancel" v-if="isVNode(cancel)" @click="handleClose(id!)"></component>
      <button v-else type="button" class="su-notification__cancel" @click="handleClose(id!)">
        <SIcon width="20" height="20" name="close"></SIcon>
      </button>
    </slot>
  </div>
</template>
