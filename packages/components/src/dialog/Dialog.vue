<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch, onMounted, isRef, type Ref } from "vue";
import { dialogInstances } from "./Dialog";
import SIcon from "../icon/Icon.vue";
import SButton from "../button/Button.vue";
import type { DialogProps } from "./types";

defineOptions({
  name: "SDialog"
});

dialogInstances.push(getCurrentInstance()!);

const props = withDefaults(defineProps<DialogProps>(), {
  size: "sm",
  showClose: true,
  appendToBody: false,
  closeOnOverlay: true
});

const emits = defineEmits(["update:visible", "on-cancel", "on-confirm"]);

const isVisible = ref<boolean | Ref<boolean>>(false);
const contentClasses = computed(() => ["su-dialog__content", `su-dialog__content--${props.size}`]);

function handleToggle(visible: boolean) {
  emits("update:visible", visible);
}

function handleCancel() {
  props.resolve?.(false);
  emits("on-cancel");
  handleToggle(false);
}

function handleConfirm() {
  props.resolve?.(true);
  emits("on-confirm");
  handleToggle(false);
}

watch(
  () => (isRef(props.visible) ? props.visible.value : props.visible),
  val => {
    isVisible.value = val;
  }
);

onMounted(() => {
  isVisible.value = isRef(props.visible) ? props.visible.value : props.visible;
});

defineExpose({ handleToggle });
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="fade">
      <div v-show="isVisible" :id="id" class="su-dialog" @click.self="() => closeOnOverlay && handleCancel">
        <div :class="contentClasses">
          <button v-if="showClose" class="su-dialog__cancel" type="button" @click="handleCancel">
            <SIcon name="close" width="24" height="24"></SIcon>
          </button>
          <div class="su-dialog__header">
            <slot name="header"></slot>
          </div>
          <div class="su-dialog__body">
            <slot name="body">Dialog Content</slot>
          </div>
          <div class="su-dialog__footer">
            <slot name="footer">
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
