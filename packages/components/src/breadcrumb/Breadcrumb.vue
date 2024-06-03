<script setup lang="ts">
import SIcon from "../icon/Icon.vue";
import SBreadcrumbItem from "./BreadcrumbItem.vue";
import type { BreadcrumbProps } from "./types";

defineOptions({
  name: "SBreadcrumb"
});

withDefaults(defineProps<BreadcrumbProps>(), {
  prepend: "",
  separator: ""
});
</script>

<template>
  <div class="su-breadcrumb">
    <div v-if="prepend || $slots.prepend" class="su-breadcrumb__prepend">
      <slot name="prepend">{{ prepend }}</slot>
    </div>

    <template v-for="(item, idx) in items" :key="idx">
      <SBreadcrumbItem v-if="typeof item === 'object'" :title="item.title" :disabled="item.disabled" :href="item.href">
        <template v-if="$slots.title" #title>
          <component :is="$slots.title" :item="item"></component>
        </template>
        <template v-else #title>{{ item.title }}</template>
      </SBreadcrumbItem>

      <SBreadcrumbItem v-else>
        <template #title>{{ item }}</template>
      </SBreadcrumbItem>

      <div v-if="idx < items.length - 1" class="su-breadcrumb__separator">
        <slot name="separator">
          <template v-if="separator">{{ separator }}</template>
          <SIcon v-else name="arrowRight"></SIcon>
        </slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
