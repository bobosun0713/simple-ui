<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch, onMounted, onBeforeUnmount, isRef, type Ref } from "vue";
import { dialogInstances } from "./instance";
import SIcon from "../icon/Icon.vue";
import SButton from "../button/Button.vue";
import { dialogProps } from "./types";
import type { DialogSlotAction, DialogExposeAction } from "./types";

defineOptions({
  name: "SDialog"
});

const instance = getCurrentInstance()!;
dialogInstances.push(instance);

const props = defineProps(dialogProps);

const emits = defineEmits(["update:visible", "on-cancel", "on-confirm", "on-close"]);

defineSlots<{
  header?: () => any;
  body?: () => any;
  footer?: (props: DialogSlotAction) => any;
}>();

const isVisible = ref<boolean | Ref<boolean>>(false);
const contentClasses = computed(() => ["su-dialog__content", `su-dialog__content--${props.size}`]);
const getModelValue = computed(() => (isRef(props.visible) ? Boolean(props.visible.value) : Boolean(props.visible)));

function handleToggle(visible: boolean): void {
  emits("update:visible", visible);
}
function handleClose(): void {
  props.onClose?.();
  emits("on-close");
  handleToggle(false);
}
function handleCancel(): void {
  props.onCancel?.();
  emits("on-cancel");
  handleToggle(false);
}
function handleConfirm(): void {
  props.onConfirm?.();
  emits("on-confirm");
  handleToggle(false);
}

watch(
  () => getModelValue.value,
  val => {
    isVisible.value = val;
  }
);

onMounted(() => {
  isVisible.value = getModelValue.value;
});

onBeforeUnmount(() => {
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
            <SIcon
              v-if="showClose"
              class="su-dialog__close"
              name="close"
              width="24"
              height="24"
              @click="handleClose"
            ></SIcon>
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
