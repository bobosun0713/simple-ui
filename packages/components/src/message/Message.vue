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

const messageList = ref<MessageContentProps[]>([]);
const messagesIdx = ref(0);

const width = computed(() => `width:${props.width}px;`);
const offsetTop = computed(() => `top:${props.offsetTop}px;`);
const eleSpacing = computed(() => `margin-top:${props.eleSpacing}px;`);

function handleAdd(data: MessageContentProps): void {
  const message = { id: messagesIdx.value, ...data };

  if (messageList.value.length === 0) messagesIdx.value = 0;

  messagesIdx.value += 1;
  messageList.value.push(message);
}

function handleRemove(idx: string | number): void {
  const findIdx = messageList.value.findIndex(item => item.id === idx);
  messageList.value.splice(findIdx, 1);
}

function handleRemoveAll(): void {
  messageList.value = [];
}

defineExpose({ handleAdd, handleRemoveAll });
</script>

<template>
  <transition-group tag="div" mode="out-in" name="message" class="su-message-wrap" :style="[width, offsetTop]">
    <MessageContent
      v-for="(item, itemIdx) in messageList"
      :id="item.id"
      :key="item.id"
      :type="item.type"
      :message="item.message"
      :show-close="showClose"
      :duration="duration"
      :style="itemIdx !== 0 && eleSpacing"
      @on-close="handleRemove"
    >
      <template #content>
        <slot name="content" :message="item.message"></slot>
      </template>

      <template #cancel>
        <slot name="cancel"></slot>
      </template>
    </MessageContent>
  </transition-group>
</template>

<style lang="scss">
@use "./style";
</style>
