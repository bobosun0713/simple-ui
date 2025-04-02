<script lang="ts" setup>
import { computed, inject } from "vue";
import SIcon from "../icon/Icon.vue";
import { type CollapseItemProps, type CollapseItemEmits, collapsePropsKey } from "./types";

const collapse = inject(collapsePropsKey);

defineOptions({
  name: "SCollapseItem"
});

const props = withDefaults(defineProps<CollapseItemProps>(), {
  name: "",
  title: "Tips",
  content: "Collapse Content"
});

const emits = defineEmits<CollapseItemEmits>();

const isActive = computed(() => collapse && collapse.activeNames.value.indexOf(props.name) > -1);

const handleClick = (): void => {
  emits("active", props.name);
};
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
        <div class="su-collapse-item__content-box">
          <slot name="default">
            {{ content }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
