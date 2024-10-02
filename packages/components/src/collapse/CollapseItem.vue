<script lang="ts" setup>
import { computed } from "vue";
import SIcon from "../icon/Icon.vue";
import { type CollapseItemProps } from "./types";

defineOptions({
  name: "SCollapseItem"
});

const { name = "", title = "Tips", content = "Collapse Content", activeNames = [] } = defineProps<CollapseItemProps>();
const emits = defineEmits(["active"]);

const isActive = computed(() => activeNames.indexOf(name) > -1);

function handleClick(): void {
  emits("active", name);
}
</script>

<template>
  <div class="su-collapse-item" @click="handleClick">
    <div class="su-collapse-item__header" :class="{ 'su-collapse-item__header--active': isActive }">
      <slot name="title">
        {{ title }}
      </slot>
      <slot name="icon">
        <SIcon
          :class="['su-collapse-item__icon', { 'su-collapse-item__icon--active': isActive }]"
          name="arrowLeft"
        ></SIcon>
      </slot>
    </div>
    <div :class="['su-collapse-item__body', { 'su-collapse-item__body--open': isActive }]">
      <div class="su-collapse-item__content">
        <slot name="default">
          {{ content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
