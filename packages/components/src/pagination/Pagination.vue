<script setup lang="ts">
import { computed } from "vue";
import SIcon from "../icon/Icon.vue";

defineOptions({
  name: "SPagination"
});

const props = defineProps({
  perPage: {
    type: Number,
    default: 3
  },
  total: {
    type: Number,
    default: 100
  },
  pager: {
    type: Number,
    default: 5
  },
  rounded: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const current = defineModel<number>("current", { default: 1 });

const totalPage = computed(() => Math.ceil(props.total / props.perPage) || 1);
const pages = computed(() => {
  const pageButtons = [];

  const pagerFirstHalf = Math.ceil(props.pager / 2);
  const pagerLastHalf = Math.floor(props.pager / 2);

  let startPage = 1;
  let endPage = current.value + props.pager - 1;

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
  "su-pagination__btn": true,
  "su-pagination__btn--rounded": props.rounded
}));
const pagerClasses = computed(() => ({
  "su-pagination__pager": true,
  "su-pagination__pager--rounded": props.rounded,
  "su-pagination__pager--disabled": props.disabled
}));

function handlePrev() {
  if (isFirstPage.value || props.disabled) return;
  current.value -= 1;
}
function handleNext() {
  if (isLastPage.value || props.disabled) return;
  current.value += 1;
}
function handleClickPager(val: number) {
  current.value = val;
}
</script>

<template>
  <div class="su-pagination">
    <button
      type="button"
      :class="[
        buttonClasses,
        {
          'su-pagination__btn--disabled': props.disabled || isFirstPage
        }
      ]"
      @click="handlePrev"
    >
      <SIcon class="su-pagination__btn-icon" name="arrowLeft"></SIcon>
    </button>
    <ul class="su-pagination__pagers">
      <li v-for="item in pages" :key="item" @click="handleClickPager(item)">
        <button type="button" :class="[pagerClasses, { 'su-pagination__pager--active': current === item }]">
          {{ item }}
        </button>
      </li>
    </ul>
    <button
      type="button"
      :class="[
        buttonClasses,
        {
          'su-pagination__btn--disabled': props.disabled || isLastPage
        }
      ]"
      @click="handleNext"
    >
      <SIcon class="su-pagination__btn-icon" name="arrowRight"></SIcon>
    </button>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
