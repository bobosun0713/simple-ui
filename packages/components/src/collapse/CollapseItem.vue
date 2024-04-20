<script lang="ts" setup>
import { ref, onMounted, computed, inject, type Ref } from "vue";

const collapse = inject<{ activeNames: Ref<[string, number]>; handleActive: (name: string) => void }>("collapse");

const props = defineProps({
  name: {
    type: String,
    default: () => crypto.randomUUID()
  },
  title: {
    type: String,
    default: "Tips"
  },
  content: {
    type: String,
    default: "Collapse Content"
  }
});

const contentRef = ref<HTMLDivElement | null>(null);
const contentHeight = ref(0);

const isActive = computed(() => collapse!.activeNames.value?.indexOf(props.name) > -1);
const getContentHeight = computed(() => (isActive.value ? `${contentHeight.value}px` : `0px`));

function handleClick(): void {
  collapse?.handleActive(props.name);
}

onMounted(() => {
  contentHeight.value = Number(contentRef.value?.getBoundingClientRect().height);
});
</script>

<template>
  <div class="su-collapse-item" @click="handleClick">
    <div class="su-collapse-item__header" :class="{ 'su-collapse-item__header--active': isActive }">
      <slot name="title">
        {{ props.title }}
      </slot>
      <slot name="icon">
        <SIcon
          class="su-collapse-item__icon"
          :class="{ 'su-collapse-item__icon--active': isActive }"
          name="arrowLeft"
        ></SIcon>
      </slot>
    </div>
    <div class="su-collapse-item__body" :style="`height:${getContentHeight}`">
      <div ref="contentRef" class="su-collapse-item__content">
        <slot name="default">
          {{ props.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
