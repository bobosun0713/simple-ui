<script setup lang="ts">
import { computed } from "vue";
import STooltip from "../tooltip/Tooltip.vue";

import type { PopoverProps } from "./types";

defineOptions({
  name: "SPopover"
});

const props = withDefaults(defineProps<PopoverProps>(), {
  offset: 0
});

const emits = defineEmits(["update:modelValue"]);

const calcOffset = computed(() => 6.5 + Number(props.offset));

function triggerModelValue(visible: boolean): void {
  emits("update:modelValue", visible);
}
</script>

<template>
  <STooltip
    :model-value="modelValue"
    :placement="placement"
    :content="content"
    :offset="calcOffset"
    @update:model-value="triggerModelValue"
  >
    <template #default>
      <slot name="default"></slot>
    </template>

    <template #content>
      <div class="su-popover">
        <div class="su-popover__inner">
          <template v-if="$slots.content">
            <slot name="content"></slot>
          </template>
          <template v-else>
            {{ content }}
          </template>
        </div>
        <span class="su-popover__arrow"></span>
      </div>
    </template>
  </STooltip>
</template>

<style lang="scss">
@use "./style";
</style>
