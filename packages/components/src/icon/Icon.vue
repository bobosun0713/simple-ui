<script lang="ts" setup>
import { computed, defineAsyncComponent, type PropType } from "vue";
import type { IconNames } from "./types";

defineOptions({
  name: "SIcon"
});

const props = defineProps({
  name: {
    type: String as PropType<IconNames>,
    default: "github"
  },
  width: {
    type: [String, Number],
    default: 20
  },
  height: {
    type: [String, Number],
    default: 20
  },
  fill: {
    type: String,
    default: ""
  }
});

const iconModules = import.meta.glob("./svg/*.vue");
const currentIcon = computed(() => defineAsyncComponent(iconModules[`./svg/${props.name}.vue`] as any));
</script>

<template>
  <component
    :is="currentIcon"
    v-if="currentIcon"
    :fill="props.fill"
    :width="props.width"
    :height="props.height"
  ></component>
</template>
