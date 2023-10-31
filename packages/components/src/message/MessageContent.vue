<script setup lang="ts">
import SIcon from "../icon/Icon.vue";
import type { MessageContentProps } from "./types";

defineOptions({
  name: "SMessageContent"
});

const props = defineProps<MessageContentProps>();
const emit = defineEmits(["on-close"]);

function handleClose(idx: string | number) {
  emit("on-close", idx);
}
</script>

<template>
  <div :class="['su-message', `su-message--${props.type}`]">
    {{ message }}
    <button v-if="props.showClose" type="button" class="su-message__cancel" @click="handleClose(props.id as number)">
      <SIcon name="close" width="24" height="24"></SIcon>
    </button>
  </div>
</template>
