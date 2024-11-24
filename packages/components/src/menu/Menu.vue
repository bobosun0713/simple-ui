<script setup lang="ts">
import { computed, provide, ref } from "vue";

import MenuItem from "./MenuItem.vue";
import { MENU_INJECT_KEY } from "./types";
import type { MenuProvide, MenuProps } from "./types";

const {
  // 預設 vertical 共 2 種模式: vertical, horizontal
  mode = "vertical",
  items = [],
  // 僅在 horizontal 模式下有效
  placement = "center",
  // 僅在 vertical 模式下有效
  isExpand = true
} = defineProps<MenuProps>();

const expandClasses = computed(() => {
  if (mode === "horizontal") return undefined;
  return isExpand ? "j-nav--expand" : "j-nav--collapse";
});

const switchModeClasses = computed(() => [
  `j-nav--${mode}`,
  mode === "horizontal" ? `j-nav--horizontal-${placement}` : undefined
]);

const rootActiveIds = ref<string[]>([]);
const rooSetActiveIds: MenuProvide["rooSetActiveIds"] = (ids): void => {
  rootActiveIds.value = [...ids];
};

provide(MENU_INJECT_KEY, {
  rootActiveIds,
  rooSetActiveIds
});
</script>

<template>
  <ul :class="['j-nav', switchModeClasses, , expandClasses]">
    <MenuItem v-for="item in items" :key="item.id" :active-ids="[item.id]" :item :mode :is-expand></MenuItem>
  </ul>
</template>

<style>
@import "./style/index.scss";
</style>
