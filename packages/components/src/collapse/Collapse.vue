<script setup lang="ts">
import { ref, provide, type PropType } from "vue";
import { CollapseProps } from "./types";

const modelValue = defineModel({ type: Array as PropType<string[] | string>, default: () => [] });

const props = withDefaults(defineProps<CollapseProps>(), {
  accordion: false
});

const activeNames = ref(Array.isArray(modelValue.value) ? [...modelValue.value] : []);

function handleActive(name: string): void {
  if (props.accordion) {
    activeNames.value = activeNames.value.includes(name) ? [] : [name];
  } else {
    const getCurrentIndex = activeNames.value.indexOf(name);
    if (getCurrentIndex > -1) activeNames.value.splice(getCurrentIndex, 1);
    else activeNames.value.push(name);
  }

  modelValue.value = props.accordion ? activeNames.value[0] : activeNames.value;
}

provide("collapse", {
  activeNames,
  handleActive
});
</script>

<template>
  <div class="su-collapse">
    <slot name="default"></slot>
  </div>
</template>
