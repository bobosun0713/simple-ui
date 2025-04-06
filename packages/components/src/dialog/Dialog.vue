<script setup lang="ts">
import { computed, getCurrentInstance, onUnmounted } from "vue";
import { dialogInstances } from "./instance";
import SIcon from "../icon/Icon.vue";
import SButton from "../button/Button.vue";
import type { DialogProps, DialogExposeAction, DialogEmits, DialogSlots } from "./types";

defineOptions({
  name: "SDialog"
});

const instance = getCurrentInstance()!;
dialogInstances.push(instance);

const props = withDefaults(defineProps<DialogProps>(), {
  id: "",
  visible: false,
  size: "md",
  closeOnOverlay: true,
  showClose: true,
  appendToBody: true,
  onConfirm: undefined,
  onCancel: undefined,
  onClose: undefined,
  vanish: undefined
});

const emits = defineEmits<DialogEmits>();

defineSlots<DialogSlots>();

const contentClasses = computed(() => ["su-dialog__content", `su-dialog__content--${props.size}`]);

const visibleValue = computed({
  get: () => props.visible,
  set: val => {
    emits("update:visible", val);
  }
});

const handleToggle = (val = false): void => {
  visibleValue.value = val;
};

const handleClose = (): void => {
  props.onClose?.();
  emits("close");
  handleToggle(false);
};

const handleCancel = (): void => {
  props.onCancel?.();
  emits("cancel");
  handleToggle(false);
};

const handleConfirm = (): void => {
  props.onConfirm?.();
  emits("confirm");
  handleToggle(false);
};

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
      <div v-show="visibleValue" :id="id" class="su-dialog" @click.self="() => closeOnOverlay && handleClose()">
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
              <div class="su-dialog__buttons">
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
