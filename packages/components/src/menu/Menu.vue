<script setup lang="ts">
import { computed, ref } from "vue";

import MenuItem from "./MenuItem.vue";

const props = defineProps({
  // 預設 vertical 共 2 種模式: vertical, horizontal
  mode: {
    type: String,
    default: "vertical"
  },

  // 僅在 horizontal 模式下有效
  placement: {
    type: String,
    default: "center"
  },

  // 僅在 vertical 模式下有效
  isExpand: {
    type: Boolean
    // default: true
  }
});

const items = ref([
  {
    name: "Menu-",
    icon: "home"
  },
  {
    name: "Menu-2",
    icon: "home",
    children: [
      {
        name: "text 2 child"
      }
    ]
  }
]);

const activeItems = ref([]);

const expandClasses = computed(() => {
  if (props.mode === "horizontal") return undefined;
  return props.isExpand ? "j-nav--expand" : "j-nav--collapse";
});

const ttt = a => {
  alert("11");
  activeItems.value.push(a);
};
</script>

<template>
  <ul :class="['j-nav', `j-nav--${mode}`, expandClasses]">
    <MenuItem
      v-for="(item, itemIdx) in items"
      :key="`${item.name}-${itemIdx}`"
      :item
      :mode
      :is-expand
      @on-click:item="ttt"
    ></MenuItem>
  </ul>
</template>

<style>
@import "./style/index.scss";
</style>
