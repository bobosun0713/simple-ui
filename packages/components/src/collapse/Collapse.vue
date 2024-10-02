<script setup lang="ts">
import { computed, ref, useSlots, provide, type PropType, type Component } from "vue";
import { type CollapseProps, collapsePropsKey } from "./types";

defineOptions({
  name: "SCollapse"
});

const modelValue = defineModel({ type: Array as PropType<string[] | string>, default: () => [] });
const { accordion = false } = defineProps<CollapseProps>();

const slots = useSlots();

const activeNames = ref(Array.isArray(modelValue.value) ? [...modelValue.value] : []);

function handleActive(name: string): void {
  if (accordion) {
    activeNames.value = activeNames.value.includes(name) ? [] : [name];
    return;
  }

  const getCurrentIndex = activeNames.value.indexOf(name);
  if (getCurrentIndex > -1) activeNames.value.splice(getCurrentIndex, 1);
  else activeNames.value.push(name);

  modelValue.value = accordion ? activeNames.value[0] : activeNames.value;
}

const collapseItems = computed(
  () => slots.default?.().filter(slot => (slot.type as Component).name === "SCollapseItem") ?? []
);

provide(collapsePropsKey, { activeNames });
</script>

<template>
  <div class="su-collapse">
    <template v-for="slot in collapseItems" :key="slot">
      <component :is="slot" @active="handleActive"></component>
    </template>
  </div>
</template>
