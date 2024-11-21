<script setup lang="ts">
import { computed, ref } from "vue";

import SIcon from "../icon/Icon.vue";

defineOptions({
  name: "SMenuItem"
});

const props = defineProps({
  mode: {
    type: String,
    default: "horizontal"
  },
  item: {
    type: Object,
    default: () => ({})
  },

  isExpand: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["on-click:item"]);

const isToggleSub = ref(false);
const isNotHorizontal = computed(() => props.mode !== "horizontal");
const hasChildren = computed(() => props.item.children?.length > 0);
const toggleChildrenBtnIcon = computed(() => {
  if (isToggleSub.value) return "arrowTop";
  if (isNotHorizontal.value && hasChildren.value && !props.isExpand) return "arrowRight";
  return "arrowBottom";
});

const toggleSubItem = (): void => {
  console.log("toggleSubItem");
  isToggleSub.value = !isToggleSub.value;
};

const mouseOver = (e: MouseEvent): void => {
  if (props.isExpand) return;
  if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) isToggleSub.value = true;
  else isToggleSub.value = false;
};

const triggerItem = (data: object): void => {
  emits("on-click:item", data);
};
</script>

<template>
  <li
    :class="['j-nav-item', hasChildren ? 'j-nav-item--children' : 'j-nav-item--no-children']"
    @mousemove="mouseOver($event)"
  >
    <div class="j-nav-item__content">
      <div class="j-nav-item__name" @click="triggerItem(item)">
        <SIcon v-if="item.icon" :name="item.icon" class="j-nav-item__icon"></SIcon>
        <span>{{ item.name }}</span>
      </div>

      <SIcon
        v-if="hasChildren && isNotHorizontal"
        :name="toggleChildrenBtnIcon"
        class="j-nav-item__sub-icon"
        @click="toggleSubItem"
      >
      </SIcon>
    </div>

    <ul class="j-nav-item__sub">
      <li class="j-nav-item__sub-title">{{ item.name }}</li>

      <SMenuItem
        v-for="(child, childIdx) in item.children"
        :key="`${child.name}-${childIdx}`"
        :class="[isToggleSub ? 'j-nav-item--show' : 'j-nav-item--hide']"
        :item="child"
        :mode
        :is-expand
        v-bind="$attrs"
      ></SMenuItem>
    </ul>
  </li>
</template>
