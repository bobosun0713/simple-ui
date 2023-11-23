<script setup lang="ts">
import { computed } from "vue";
import SIcon from "../icon/Icon.vue";
import SButton from "../button/Button.vue";
import type { DialogProps } from "./types";

defineOptions({
  name: "SDialog"
});

const props = withDefaults(defineProps<DialogProps>(), {
  size: "sm",
  showClose: true,
  appendToBody: false,
  closeOnOverlay: true
});

const emits = defineEmits(["update:visible"]);

const contentClasses = computed(() => ["su-dialog__content", `su-dialog__content--${props.size}`]);

function handleToggle(val: boolean) {
  emits("update:visible", val);
}
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="fade">
      <div v-if="visible" class="su-dialog" @click.self="() => closeOnOverlay && handleToggle(false)">
        <div :class="contentClasses">
          <button v-if="showClose" class="su-dialog__cancel" type="button" @click="handleToggle(false)">
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
                <SButton outlined @click="handleToggle(false)">No</SButton>
                <SButton @click="handleToggle(false)">Yes</SButton>
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
