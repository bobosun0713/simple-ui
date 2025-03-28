<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch, onMounted, onUnmounted } from "vue";
import { dialogInstances } from "./instance";
import SIcon from "../icon/Icon.vue";
import SButton from "../button/Button.vue";
import type { DialogProps, DialogSlotAction, DialogExposeAction } from "./types";

defineOptions({
  name: "SDialog"
});

const instance = getCurrentInstance()!;
dialogInstances.push(instance);

const visibleModel = defineModel("visible", {
  type: Boolean,
  default: false
});

const {
  size = "md",
  closeOnOverlay = true,
  showClose = true,
  appendToBody = true,
  onConfirm,
  onCancel,
  onClose,
  vanish
} = defineProps<DialogProps>();

const emits = defineEmits<{
  "update:visible": [value: boolean];
  "on-confirm": [];
  "on-close": [];
  "on-cancel": [];
}>();

defineSlots<{
  header?: () => unknown;
  body?: () => unknown;
  footer?: (props: DialogSlotAction) => unknown;
}>();

const isVisible = ref(false);
const contentClasses = computed(() => ["su-dialog__content", `su-dialog__content--${size}`]);

function handleToggle(val = false): void {
  visibleModel.value = val;
}

function handleClose(): void {
  onClose?.();
  emits("on-close");
  handleToggle(false);
}

function handleCancel(): void {
  onCancel?.();
  emits("on-cancel");
  handleToggle(false);
}

function handleConfirm(): void {
  onConfirm?.();
  emits("on-confirm");
  handleToggle(false);
}

watch(visibleModel, val => {
  isVisible.value = val;
});

onMounted(() => {
  isVisible.value = visibleModel.value;
});

onUnmounted(() => {
  dialogInstances.splice(dialogInstances.indexOf(instance), 1);
});

defineExpose<DialogExposeAction>({
  handleToggle
});
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="fade" @after-leave="vanish">
      <div v-show="isVisible" :id="id" class="su-dialog" @click.self="() => closeOnOverlay && handleClose()">
        <div :class="contentClasses">
          <div class="su-dialog__header">
            <slot name="header">Tips</slot>
            <button v-if="showClose" type="button" class="su-dialog__close" @click="handleClose">
              <SIcon name="close" :width="24" :height="24"></SIcon>
            </button>
          </div>

          <div class="su-dialog__body">
            <slot name="body">This is a message</slot>
          </div>

          <div class="su-dialog__footer">
            <slot name="footer" :close="handleClose" :confirm="handleConfirm" :cancel="handleCancel">
              <div class="su-dialog__default-btn">
                <SButton outlined @click="handleCancel">No</SButton>
                <SButton @click="handleConfirm">Yes</SButton>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@use "./style";
</style>
