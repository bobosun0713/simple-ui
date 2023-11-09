<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import SIcon from "../icon/Icon.vue";
import type { MessageContentProps } from "./types";

defineOptions({
  name: "SMessageContent"
});

const props = withDefaults(defineProps<MessageContentProps>(), {
  type: "info",
  message: "Message Content"
});
const emit = defineEmits(["on-close"]);

let timer: number | null = null;

function handleClose(idx: string | number) {
  emit("on-close", idx);
}
function handleAutoHide() {
  timer = window.setTimeout(() => {
    handleClose(props.id as number);
  }, props.duration as number);
}

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
    {{ message }}
    <button v-if="showClose" type="button" class="su-message__cancel" @click="handleClose(id as number)">
      <SIcon name="close" width="24" height="24"></SIcon>
    </button>
  </div>
</template>
