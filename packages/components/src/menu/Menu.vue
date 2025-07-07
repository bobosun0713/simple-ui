<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";

import MenuItem from "./MenuItem.vue";
import { MENU_INJECT_KEY } from "./types";
import type { MenuProvide, MenuProps } from "./types";

defineOptions({
  name: "SMenu"
});

const props = withDefaults(defineProps<MenuProps>(), {
  mode: "vertical",
  items: () => [],
  defaultOpens: () => [],
  placement: "center",
  isExpand: false
});

const expandClasses = computed(() => {
  if (props.mode === "horizontal") return undefined;
  return props.isExpand ? "su-nav--expand" : "su-nav--collapse";
});

const switchModeClasses = computed(() => [
  `su-nav--${props.mode}`,
  props.mode === "horizontal" ? `su-nav--horizontal-${props.placement}` : undefined
]);

const rootDefaultOpens = ref(props.defaultOpens);
const rootActiveIds: MenuProvide["rootActiveIds"] = ref<string[]>([]);
const rooSetActiveIds: MenuProvide["rooSetActiveIds"] = (ids): void => {
  rootActiveIds.value = [...ids];
};

watch(
  () => props.defaultOpens,
  newVal => {
    rootDefaultOpens.value = newVal;
  }
);

provide(MENU_INJECT_KEY, {
  rootActiveIds,
  rooSetActiveIds,
  rootDefaultOpens
});
</script>

<template>
  <ul :class="['su-nav', switchModeClasses, , expandClasses]">
    <MenuItem v-for="item in items" :key="item.id" :active-ids="[item.id]" :item :mode :is-expand></MenuItem>
  </ul>
</template>

<style>
@import "./style/index.scss";
</style>
