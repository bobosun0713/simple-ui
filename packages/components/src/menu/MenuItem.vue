<script setup lang="ts">
import { computed, ref, inject, onMounted, watch, watchEffect } from "vue";

import SIcon from "../icon/Icon.vue";
import { MENU_INJECT_KEY } from "./types";
import type { MenuItemProps } from "./types";

defineOptions({
  name: "SMenuItem"
});

const MENU_INJECTION = inject(MENU_INJECT_KEY)!;

const { mode, item, activeIds, isExpand } = defineProps<MenuItemProps>();
const emits = defineEmits(["on-click:item"]);

const isToggleSub = ref(false);

const isNotHorizontal = computed(() => mode !== "horizontal");
const hasChildren = computed(() => (item.children ?? []).length > 0);
const toggleChildrenBtnIcon = computed(() => {
  if (isToggleSub.value && isExpand) return "arrowTop";
  if (isNotHorizontal.value && hasChildren.value && !isExpand) return "arrowRight";
  return "arrowBottom";
});

const isActive = (id: string | number): boolean => {
  return !!MENU_INJECTION?.rootActiveIds.value.includes(id);
};

const handleMouseover = (e: MouseEvent): void => {
  if (isExpand) return;
  if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) isToggleSub.value = true;
  else isToggleSub.value = false;
};

const handleClick = (data: object): void => {
  MENU_INJECTION.rooSetActiveIds(activeIds);
  emits("on-click:item", data);
};

const handleToggle = (): void => {
  isToggleSub.value = !isToggleSub.value;
};

const initToggleValue = (): void => {
  if (!isNotHorizontal.value) return;

  if (typeof MENU_INJECTION.rootDefaultOpens.value === "boolean") {
    isToggleSub.value = MENU_INJECTION.rootDefaultOpens.value;
    return;
  }

  if (Array.isArray(MENU_INJECTION.rootDefaultOpens.value) && MENU_INJECTION.rootDefaultOpens.value.includes(item.id))
    isToggleSub.value = true;
  else isToggleSub.value = false;
};

watch(MENU_INJECTION.rootDefaultOpens, () => {
  initToggleValue();
});

onMounted(() => {
  initToggleValue();
});
</script>

<template>
  <li
    :class="['su-nav-item', hasChildren ? 'su-nav-item--children' : 'su-nav-item--no-children']"
    @mousemove="handleMouseover($event)"
    @click="handleClick(item)"
  >
    <div class="su-nav-item__content" :class="{ 'su-nav-item--checked': isActive(item.id) }">
      <div class="su-nav-item__name">
        <SIcon v-if="item.icon" :name="item.icon" class="su-nav-item__icon"></SIcon>
        <span>{{ item.name }}</span>
      </div>

      <SIcon
        v-if="hasChildren && isNotHorizontal"
        :name="toggleChildrenBtnIcon"
        class="su-nav-item__sub-icon"
        @click="handleToggle"
      >
      </SIcon>
    </div>

    <ul class="su-nav-item__sub">
      <li class="su-nav-item__sub-title">{{ item.name }}</li>

      <SMenuItem
        v-for="child in item.children"
        :key="child.id"
        :active-ids="[child.id, ...activeIds]"
        :class="[isToggleSub ? 'su-nav-item--show' : 'su-nav-item--hide']"
        :item="child"
        :mode
        :is-expand
      ></SMenuItem>
    </ul>
  </li>
</template>
