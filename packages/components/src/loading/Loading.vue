<script lang="ts" setup>
import { onUnmounted, watch, computed, isRef, type Ref } from "vue";
import SIcon from "../icon/Icon.vue";

defineOptions({
  name: "SLoading"
});

const props = defineProps({
  visible: {
    type: [Boolean, Object as () => Ref<boolean>],
    default: false
  },
  duration: {
    type: Number,
    default: 2000
  }
});

const emits = defineEmits(["update:visible"]);

let timer: number;

const visibleValue = computed(() => (isRef(props.visible) ? Boolean(props.visible.value) : Boolean(props.visible)));

watch(visibleValue, () => {
  if (!props.duration) return;
  if (timer) clearTimeout(timer);
  timer = window.setTimeout(() => emits("update:visible", false), props.duration);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <Transition name="loading">
    <div v-show="visibleValue" class="su-loading">
      <div class="su-loading-content">
        <slot name="spinner">
          <SIcon name="loading" width="60" height="60" fill="#3e8ed0" class="su-loading-spinner"></SIcon>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
