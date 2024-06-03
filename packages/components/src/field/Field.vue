<script setup lang="ts">
import { computed } from "vue";
import type { FieldProps } from "./types";

defineOptions({
  name: "SField"
});

const props = withDefaults(defineProps<FieldProps>(), {
  type: "",
  label: "",
  message: "",
  labelPosition: "border",
  showMessages: true
});

const hasMessage = computed(() => !!props.message);

const classes = computed(() => {
  return {
    label: {
      "su-field-label": true,
      "su-field-label--inside": props.labelPosition === "inside" && props.label,
      "su-field-label--border": props.labelPosition === "border" && props.label
    },
    content: {
      "su-field-content": true,
      "su-field-content--success": props.type === "success",
      "su-field-content--error": props.type === "error",
      "su-field-content--warning": props.type === "warning"
    },
    message: {
      "su-field-message": true,
      "su-field-message--success": props.type === "success",
      "su-field-message--error": props.type === "error",
      "su-field-message--warning": props.type === "warning"
    }
  };
});
</script>

<template>
  <div class="su-field">
    <div class="su-field-container">
      <div :class="classes['label']">
        <slot name="label">{{ label }}</slot>
      </div>
      <div :class="classes['content']">
        <slot name="default"></slot>
      </div>
    </div>

    <p v-show="showMessages && hasMessage" :class="classes['message']">
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
