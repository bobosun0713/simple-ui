<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

defineOptions({
  name: "SBreadcrumbItem"
});

const props = defineProps({
  title: {
    type: [String, Number],
    default: ""
  },
  href: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

function handleClick(path: string | object, $event: Event): void {
  $event.preventDefault();
  if (!path || props.disabled) return;
  router.push(path);
}
</script>

<template>
  <div class="su-breadcrumb-item">
    <a
      :href="href"
      :disabled="disabled"
      :class="[
        'su-breadcrumb-link',
        { 'su-breadcrumb-link--href': href && !disabled, 'su-breadcrumb-link--disabled': disabled }
      ]"
      @click="handleClick(href, $event)"
    >
      <slot name="title"> {{ title }}</slot>
    </a>
  </div>
</template>
