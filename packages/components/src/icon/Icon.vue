<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";
import type { IconProps } from "./Icon";

defineOptions({
  name: "SIcon"
});

const props = withDefaults(defineProps<IconProps>(), {
  name: "github",
  width: 20,
  height: 20
});

const iconModules = import.meta.glob("./svg/*.vue");
const currentIcon = computed(() => {
  const fileName = "/" + props.name + ".vue";
  for (const path in iconModules) {
    const mod: any = iconModules[path];
    if (path.endsWith(fileName)) {
      return defineAsyncComponent(mod);
    }
  }
  return false;
});
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
