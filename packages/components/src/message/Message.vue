<script lang="ts" setup>
import { ref, computed } from "vue";
import MessageContent from "./MessageContent.vue";
import type { MessageProps, MessageContentProps } from "./types";

defineOptions({
  name: "SMessage"
});

const props = withDefaults(defineProps<MessageProps>(), {
  width: 300,
  offsetTop: 10,
  eleSpacing: 10,
  duration: 3000,
  showClose: true
});

const messages = ref<any[]>([]);
const messagesIdx = ref(0);

const width = computed(() => `width:${props.width}px;`);
const offsetTop = computed(() => `top:${props.offsetTop}px;`);
const eleSpacing = computed(() => `margin-top:${props.eleSpacing}px;`);

function handleAdd(data: MessageContentProps) {
  const message = { id: messagesIdx.value, ...data };
  messagesIdx.value += 1;
  messages.value.push(message);
}
function handleRemove(idx: string | number) {
  const findIdx = messages.value.findIndex(item => item.id === idx);
  messages.value.splice(findIdx, 1);
}
function handleRemoveAll() {
  messages.value = [];
}

defineExpose({ handleAdd, handleRemoveAll });
</script>

<template>
  <transition-group tag="div" mode="out-in" name="message" class="su-message-wrap" :style="[width, offsetTop]">
    <MessageContent
      v-for="(note, noteIdx) in messages"
      :id="note.id"
      :key="note.id"
      :type="note.type"
      :message="note.message"
      :show-close="props.showClose"
      :duration="props.duration"
      :style="noteIdx !== 0 && eleSpacing"
      @on-close="handleRemove"
    ></MessageContent>
  </transition-group>
</template>

<style lang="scss">
@use "./style";
</style>
