<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import type { BackTopProps } from "./types";

defineOptions({
  name: "SBackTop"
});

const props = withDefaults(defineProps<BackTopProps>(), {
  target: "",
  right: 50,
  bottom: 50,
  visibilityHeight: 100,
  behavior: "smooth",
  animation: "fade"
});

const emits = defineEmits(["on-click"]);

const visible = ref(false);
const currentEl = ref<HTMLElement | null>(null);
const position = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`
}));

function getTarget(target: string | HTMLElement): HTMLElement | null {
  if (typeof target === "string") {
    if (target === "") return null;
    return document.querySelector(target)!;
  }
  return target;
}

function handleBackTop(): void {
  (currentEl.value ?? document.documentElement).scrollTo({
    top: 0,
    behavior: props.behavior
  });
  emits("on-click");
}

function triggerScroll(): void {
  const scrollTop = (currentEl.value ?? document.documentElement).scrollTop;
  visible.value = scrollTop > Number(props.visibilityHeight);
}

onMounted(async () => {
  await nextTick();
  currentEl.value = getTarget(props.target)!;
  (currentEl.value || document).addEventListener("scroll", triggerScroll);
});

onBeforeUnmount(() => {
  (currentEl.value ?? document).removeEventListener("scroll", triggerScroll);
});
</script>

<template>
  <Transition :name="animation">
    <div v-show="visible" class="su-backtop" :style="position" @click="handleBackTop">
      <div class="su-backtop__content">
        <slot name="default"> UP </slot>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
