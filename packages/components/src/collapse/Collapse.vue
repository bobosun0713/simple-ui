<script setup lang="ts">
import { computed, ref, useSlots, provide, type Component } from "vue";
import { type CollapseProps, type CollapseEmits, collapsePropsKey } from "./types";

defineOptions({
  name: "SCollapse"
});

const slots = useSlots();

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [],
  accordion: false
});

const emits = defineEmits<CollapseEmits>();

const activeNames = ref(Array.isArray(props.modelValue) ? [...props.modelValue] : []);

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emits("update:modelValue", Array.isArray(val) ? val : [val])
});

const collapseItems = computed(
  () => slots.default?.().filter(slot => (slot.type as Component).name === "SCollapseItem") ?? []
);

const handleActive = (name: string): void => {
  if (props.accordion) {
    activeNames.value = activeNames.value.includes(name) ? [] : [name];
    return;
  }

  const getCurrentIndex = activeNames.value.indexOf(name);
  if (getCurrentIndex > -1) activeNames.value.splice(getCurrentIndex, 1);
  else activeNames.value.push(name);

  modelValue.value = props.accordion ? activeNames.value[0] : activeNames.value;
};

provide(collapsePropsKey, { activeNames });
</script>

<template>
  <div class="su-collapse">
    <template v-for="slot in collapseItems" :key="slot">
      <component :is="slot" @active="handleActive"></component>
    </template>
  </div>
</template>
