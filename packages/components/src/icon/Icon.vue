<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";
import type { IconProps } from "./types";

defineOptions({
  name: "SIcon"
});

const { name = "github", width = 20, height = 20 } = defineProps<IconProps>();

const iconModules = import.meta.glob("./svg/*.vue");
const currentIcon = computed(() => defineAsyncComponent(iconModules[`./svg/${name}.vue`] as any));
</script>

<template>
  <component :is="currentIcon" v-if="currentIcon" :width :height class="su-icon"></component>
</template>

<style>
.su-icon {
  fill: currentColor;
  color: black;
}
</style>
