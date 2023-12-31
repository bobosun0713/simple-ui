<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from "vue";
import { notificationDefault } from "./props";
import type { NotificationProps } from "./types";
import type { IconNames } from "../icon/types";

const props = withDefaults(defineProps<NotificationProps>(), notificationDefault);
const emit = defineEmits(["on-close"]);

let timer: number | null = null;

const classes = computed(() => ["su-notification__container", `su-notification__container--${props.type}`]);

function closeHandler(idx: string | number) {
  emit("on-close", idx);
}
function timerHandler() {
  if (!props.duration) return;
  timer = window.setTimeout(() => {
    emit("on-close", props.id);
  }, props.duration as number);
}

onMounted(() => {
  timerHandler();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div :class="classes">
    <template v-if="!props.slots">
      <SIcon :name="`${props.type as IconNames}`"></SIcon>

      <div class="su-notification__content">
        <div class="su-notification__summary">{{ props.summary }}</div>
        <div class="su-notification__message">
          {{ props.message }}
        </div>
      </div>

      <button type="button" class="su-notification__cancel" @click="closeHandler(props.id as string)">
        <SIcon name="close"></SIcon>
      </button>
    </template>

    <component :is="props.slots" v-else></component>
  </div>
</template>
