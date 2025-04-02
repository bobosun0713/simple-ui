<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import SIcon from "../icon/Icon.vue";
import type { MessageContentProps, MessageContentEmits } from "./types";

defineOptions({
  name: "SMessageContent"
});

const props = withDefaults(defineProps<MessageContentProps>(), {
  type: "info",
  message: "Message Content"
});

const emits = defineEmits<MessageContentEmits>();

let timer: number | null = null;

const handleClose = (idx: string | number): void => {
  emits("close", idx);
};

const handleAutoHide = (): void => {
  timer = window.setTimeout(() => {
    handleClose(props.id as number);
  }, Number(props.duration));
};

onMounted(() => {
  if (!props.duration) return;
  handleAutoHide();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div :class="['su-message', `su-message--${type}`]">
    <slot name="content">
      {{ message }}
    </slot>
    <button v-if="showClose" type="button" class="su-message__cancel" @click="handleClose(id as number)">
      <slot name="cancel">
        <SIcon name="close" width="24" height="24"></SIcon>
      </slot>
    </button>
  </div>
</template>
