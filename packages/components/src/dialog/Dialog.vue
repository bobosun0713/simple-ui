<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch, onMounted, onUnmounted, isRef, type Ref } from "vue";
import { dialogInstances } from "./instance";
import SIcon from "../icon/Icon.vue";
import SButton from "../button/Button.vue";
import type { DialogProps, DialogSlotAction, DialogExposeAction } from "./types";

defineOptions({
  name: "SDialog"
});

const instance = getCurrentInstance()!;
dialogInstances.push(instance);

const props = withDefaults(defineProps<DialogProps>(), {
  visible: false,
  size: "md",
  closeOnOverlay: true,
  showClose: true,
  appendToBody: true
});
const { onConfirm, onCancel, onClose, beforeClose } = props;

const emits = defineEmits<{
  "update:visible": [value: boolean];
  "on-confirm": [done: () => void];
  "on-close": [done: () => void];
  "on-cancel": [done: () => void];
}>();

defineSlots<{
  header?: () => any;
  body?: () => any;
  footer?: (props: DialogSlotAction) => any;
}>();

const isVisible = ref<boolean | Ref<boolean>>(false);
const contentClasses = computed(() => ["su-dialog__content", `su-dialog__content--${props.size}`]);
const getModelValue = computed(() => (isRef(props.visible) ? Boolean(props.visible.value) : Boolean(props.visible)));

function handleToggle(visible = false): void {
  emits("update:visible", visible);
}

function handleClose(): void {
  onClose?.();
  emits("on-close", handleToggle);

  if (typeof beforeClose === "function") beforeClose(handleToggle);
}

function handleCancel(): void {
  onCancel?.();
  emits("on-cancel", handleToggle);

  if (typeof beforeClose === "function") beforeClose(handleToggle);
}

function handleConfirm(): void {
  onConfirm?.();
  emits("on-confirm", handleToggle);

  if (typeof beforeClose === "function") beforeClose(handleToggle);
}

watch(getModelValue, val => {
  isVisible.value = val;
});

onMounted(() => {
  isVisible.value = getModelValue.value;
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
    <Transition name="fade" @after-leave="props.vanish">
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
@import "./style/index.scss";
</style>
