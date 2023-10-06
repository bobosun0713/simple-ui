<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import type { CollapseProps } from "./types";
import SIcon from "../icon/Icon.vue";
defineOptions({
  name: "SCollapse"
});

const props = withDefaults(defineProps<CollapseProps>(), {
  title: "Title",
  content: "Lorem ipsum dolor"
});

const emit = defineEmits(["active"]);

const isActive = ref(false);
const contentRef = ref<HTMLDivElement | null>(null);
const contentHeight = ref<number | undefined>(0);

const getContentHeight = computed(() => (isActive.value ? `${contentHeight.value}px` : `0px`));
const onClickHandler = () => {
  isActive.value = !isActive.value;
  emit("active", isActive);
};

onMounted(() => {
  contentHeight.value = contentRef.value?.getBoundingClientRect().height;
});
</script>

<template>
  <div class="su-collapse">
    <div class="su-collapse__header" :class="{ 'su-collapse__header--active': isActive }" @click="onClickHandler">
      <slot name="header">
        {{ props.title }}
      </slot>
      <slot name="icon">
        <SIcon class="su-collapse__icon" :class="{ 'su-collapse__icon--active': isActive }" name="arrowLeft"></SIcon>
      </slot>
    </div>
    <div class="su-collapse__body" :style="`height:${getContentHeight}`">
      <div ref="contentRef" class="su-collapse__content">
        <slot name="content">
          {{ props.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
