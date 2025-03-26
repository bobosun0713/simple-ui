<script setup lang="ts">
import { computed } from "vue";
import SIcon from "../icon/Icon.vue";

import type { PaginationProps } from "./types";

defineOptions({
  name: "SPagination"
});

const current = defineModel("current", { type: Number, default: 1 });

const props = withDefaults(defineProps<PaginationProps>(), {
  perPage: 3,
  total: 0,
  pager: 5,
  rounded: true,
  disabled: false
});

const totalPage = computed(() => Math.ceil(props.total / props.perPage) || 1);

const pagerList = computed(() => {
  const pageButtons = [];

  const pagerFirstHalf = Math.ceil(props.pager / 2);
  const pagerLastHalf = Math.floor(props.pager / 2);

  let startPage = 1;
  let endPage = current.value + Number(props.pager) - 1;

  if (totalPage.value <= props.pager) {
    startPage = 1;
    endPage = totalPage.value;
  } else if (current.value <= pagerFirstHalf) {
    startPage = 1;
    endPage = props.pager;
  } else if (current.value >= totalPage.value - pagerLastHalf) {
    startPage = totalPage.value - props.pager + 1;
    endPage = totalPage.value;
  } else {
    startPage = current.value - pagerLastHalf;
    endPage = current.value + pagerFirstHalf;
  }

  for (let page = startPage; page <= endPage; page++) {
    pageButtons.push(page);
  }

  return pageButtons.slice(0, props.pager);
});

const isFirstPage = computed(() => current.value === 1);
const isLastPage = computed(() => current.value === totalPage.value);

const buttonClasses = computed(() => ({
  main: {
    "su-pagination__btn": true,
    "su-pagination__btn--rounded": props.rounded
  },
  left: {
    "su-pagination__btn--disabled": props.disabled || isFirstPage.value
  },
  right: {
    "su-pagination__btn--disabled": props.disabled || isLastPage.value
  }
}));

const pagerClasses = computed(() => ({
  "su-pagination__pager": true,
  "su-pagination__pager--rounded": props.rounded,
  "su-pagination__pager--disabled": props.disabled
}));

function handlePrev(): void {
  if (isFirstPage.value || props.disabled) return;
  current.value -= 1;
}
function handleNext(): void {
  if (isLastPage.value || props.disabled) return;
  current.value += 1;
}
function handleClickPager(val: number): void {
  current.value = val;
}
</script>

<template>
  <div class="su-pagination">
    <button type="button" :class="[buttonClasses.main, buttonClasses.left]" @click="handlePrev">
      <SIcon class="su-pagination__btn-icon" name="arrowLeft"></SIcon>
    </button>

    <ul class="su-pagination__pagers">
      <li v-for="page in pagerList" :key="page" @click="handleClickPager(page)">
        <button type="button" :class="[pagerClasses, { 'su-pagination__pager--active': current === page }]">
          {{ page }}
        </button>
      </li>
    </ul>

    <button type="button" :class="[buttonClasses.main, buttonClasses.right]" @click="handleNext">
      <SIcon class="su-pagination__btn-icon" name="arrowRight"></SIcon>
    </button>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
