<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";
import type { IconProps } from "./types";

defineOptions({
  name: "SIcon"
});

const props = withDefaults(defineProps<IconProps>(), {
  name: "github",
  width: 20,
  height: 20
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
