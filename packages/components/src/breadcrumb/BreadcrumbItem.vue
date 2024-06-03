<script setup lang="ts">
import { useRouter } from "vue-router";
import type { BreadcrumbItem } from "./types";

const router = useRouter();

defineOptions({
  name: "SBreadcrumbItem"
});

const props = withDefaults(defineProps<BreadcrumbItem>(), {
  title: "",
  href: "",
  disabled: false
});

function handleClick(path: string | object, $event: Event): void {
  $event.preventDefault();
  if (!path || props.disabled) return;

  void router.push(path);
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
