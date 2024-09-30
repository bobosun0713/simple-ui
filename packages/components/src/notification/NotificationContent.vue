<script lang="ts" setup>
import { computed, onMounted, onUnmounted, isVNode } from "vue";
import SIcon from "../icon/Icon.vue";
import type { NotificationContentProps } from "./types";

const { type = "info", title = "Tips", message = "Content", ...props } = defineProps<NotificationContentProps>();

const emits = defineEmits(["on-close"]);

let timer: number | null = null;

const classes = computed(() => ["su-notification", `su-notification--${type}`]);

function handleTimer(): void {
  if (!props.duration) return;
  timer = window.setTimeout(() => {
    emits("on-close", props.id);
  }, props.duration as number);
}

function handleClose(id: string | number): void {
  emits("on-close", id);
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
