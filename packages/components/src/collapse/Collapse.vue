<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import SIcon from "../icon/Icon.vue";

defineOptions({
  name: "SCollapse"
});

const props = defineProps({
  title: {
    type: String,
    default: "Tips"
  },
  content: {
    type: String,
    default: "Collapse Content"
  }
});

const emit = defineEmits(["on-click"]);

const isActive = ref(false);
const contentRef = ref<HTMLDivElement | null>(null);
const contentHeight = ref(0);

const getContentHeight = computed(() => (isActive.value ? `${contentHeight.value}px` : `0px`));

function handleClick(): void {
  isActive.value = !isActive.value;
  emit("on-click", isActive);
}

onMounted(() => {
  contentHeight.value = Number(contentRef.value?.getBoundingClientRect().height);
});
</script>

<template>
  <div class="su-collapse">
    <div class="su-collapse__header" :class="{ 'su-collapse__header--active': isActive }" @click="handleClick">
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
