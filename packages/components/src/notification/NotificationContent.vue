<script lang="ts" setup>
import { computed, onMounted, onUnmounted, isVNode } from "vue";
import SIcon from "../icon/Icon.vue";
import type { NotificationContentProps } from "./types";

const props = withDefaults(defineProps<NotificationContentProps>(), {
  type: "info",
  title: "Notification Title",
  message: "Notification Message"
});

const emit = defineEmits(["on-close"]);

let timer: number | null = null;

const classes = computed(() => ["su-notification", `su-notification--${props.type}`]);

function handleTimer(): void {
  if (!props.duration) return;
  timer = window.setTimeout(() => {
    emit("on-close", props.id);
  }, props.duration as number);
}

function handleClose(id: string | number): void {
  emit("on-close", id);
}

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
        <component :is="props.title" v-if="isVNode(props.title)"></component>
        <div v-else class="su-notification__title">{{ props.title }}</div>
      </slot>

      <slot name="message">
        <component :is="props.message" v-if="isVNode(props.message)"></component>
        <div v-else class="su-notification__message">{{ props.message }}</div>
      </slot>
    </div>

    <slot name="cancel">
      <component :is="props.cancel" v-if="isVNode(props.cancel)" @click="handleClose(props.id as string)"></component>
      <button v-else type="button" class="su-notification__cancel" @click="handleClose(props.id as string)">
        <SIcon width="20" height="20" name="close"></SIcon>
      </button>
    </slot>
  </div>
</template>
