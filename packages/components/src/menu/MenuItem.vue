<script setup lang="ts">
import { computed, ref, inject } from "vue";

import SIcon from "../icon/Icon.vue";
import { MENU_INJECT_KEY } from "./types";

defineOptions({
  name: "SMenuItem"
});

const MENU_INJECTION = inject(MENU_INJECT_KEY);

const props = defineProps({
  mode: {
    type: String,
    default: "horizontal"
  },
  item: {
    type: Object,
    default: () => ({})
  },
  activeIds: {
    type: Array,
    default: () => []
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
  if (isToggleSub.value && props.isExpand) return "arrowTop";
  if (isNotHorizontal.value && hasChildren.value && !props.isExpand) return "arrowRight";
  return "arrowBottom";
});

const isActive = (id: string): boolean => {
  return !!MENU_INJECTION?.rootActiveIds.value.includes(id);
};

const handleMouseover = (e: MouseEvent): void => {
  if (props.isExpand) return;
  if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) isToggleSub.value = true;
  else isToggleSub.value = false;
};

const handleClick = (data: object): void => {
  if (hasChildren.value) return;
  MENU_INJECTION?.rooSetActiveIds(props.activeIds as string[]);

  emits("on-click:item", data);
};

const handleToggle = (): void => {
  isToggleSub.value = !isToggleSub.value;
};
</script>

<template>
  <li
    :class="['j-nav-item', hasChildren ? 'j-nav-item--children' : 'j-nav-item--no-children']"
    @mousemove="handleMouseover($event)"
  >
    <div class="j-nav-item__content" :class="{ 'j-nav-item--checked': isActive(item.id) }">
      <div class="j-nav-item__name" @click="handleClick(item)">
        <SIcon v-if="item.icon" :name="item.icon" class="j-nav-item__icon"></SIcon>
        <span>{{ item.name }}</span>
      </div>

      <SIcon
        v-if="hasChildren && isNotHorizontal"
        :name="toggleChildrenBtnIcon"
        class="j-nav-item__sub-icon"
        @click="handleToggle"
      >
      </SIcon>
    </div>

    <ul class="j-nav-item__sub">
      <li class="j-nav-item__sub-title">{{ item.name }}</li>

      <SMenuItem
        v-for="child in item.children"
        :key="child.id"
        :active-ids="[child.id, ...activeIds]"
        :class="[isToggleSub ? 'j-nav-item--show' : 'j-nav-item--hide']"
        :item="child"
        :mode
        :is-expand
      ></SMenuItem>
    </ul>
  </li>
</template>
