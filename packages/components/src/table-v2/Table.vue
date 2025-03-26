<script setup lang="ts" generic="T extends { [key: string]: unknown }">
import { ref, onMounted, watch } from "vue";
import { deepClone } from "@simple/utils";
import SIcon from "../icon/Icon.vue";
import type { TableProps, TableRow, TableColumn } from "./types";

defineOptions({
  name: "STableV2"
});

const {
  rows = [],
  columns = [],
  defaultSort = { orderBy: "", sortBy: "desc" },
  checkable = false,
  checkableKey = "",
  stickyHeader = false
} = defineProps<TableProps<T>>();

const emits = defineEmits(["update:modelValue", "sort"]);

const tableCols = ref<TableColumn[]>([]);
const tableRows = ref<TableRow<T>[]>([]);
const orderBy = ref("");

const checkedList = ref<unknown[]>([]);
const checked = ref<null | HTMLInputElement>(null);
const isCheckAll = ref(false);

function transformColumns(): void {
  for (const col of columns) {
    const sortState = col.sort ? defaultSort.orderBy === col.prop : "none";

    tableCols.value.push({
      ...col,
      sort: sortState,
      sortBy: defaultSort.sortBy
    });
  }

  // Find the currently sorted property,
  // If there are identical props, only the first one will be assigned.
  for (const col of tableCols.value) {
    if (col.prop === defaultSort.orderBy && col.sort !== "none" && col.sort) {
      col.sortActive = true;
      break;
    }
  }
}

function hasSortState(col: TableColumn): boolean {
  return col.prop === orderBy.value && !!col.sort && !!col.prop && !!col.sortActive;
}

function handleSort(col: TableColumn): void {
  if (col.sort === "none") return;

  tableCols.value.forEach(col => {
    if (col.sort !== "none") {
      col.sort = false;
      col.sortActive = false;
    }
  });

  col.sort = true;
  col.sortActive = true;

  if (orderBy.value === col.prop) {
    if (col.sortBy === "asc") col.sortBy = "desc";
    else col.sortBy = "asc";
  }

  orderBy.value = col.prop ?? "";

  emits("sort", { orderBy: orderBy.value, sortBy: col.sortBy });
}

function handleCheckAll(): void {
  isCheckAll.value = !isCheckAll.value;

  tableRows.value.forEach(row => {
    const rowVal = row[checkableKey] ?? row;

    if (isCheckAll.value) {
      row.checked = true;
      if (!checkedList.value.includes(rowVal)) checkedList.value.push(rowVal);
    } else {
      row.checked = false;
      checkedList.value = [];
    }
  });

  emits("update:modelValue", checkedList.value);
}

function handleChecked(row: TableRow<T>): void {
  const idx = checkedList.value.findIndex(item => (row[checkableKey] ? item === row[checkableKey] : item === row));

  if (idx === -1) {
    checkedList.value.push(row[checkableKey] ?? row);
    row.checked = true;
  } else {
    checkedList.value.splice(idx, 1);
    row.checked = false;
  }

  if (checkedList.value.length && checkedList.value.length !== tableRows.value.length) {
    isCheckAll.value = false;
    checked.value!.indeterminate = true;
  } else if (checkedList.value.length === tableRows.value.length) {
    isCheckAll.value = true;
    checked.value!.indeterminate = false;
  } else {
    isCheckAll.value = false;
    checked.value!.indeterminate = false;
  }

  emits("update:modelValue", checkedList.value);
}

watch(
  () => rows,
  newVal => {
    tableRows.value = deepClone(newVal).map(item => ({ ...item, ...(checkable ? { checked: false } : {}) }));
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  transformColumns();
  if (defaultSort.orderBy) orderBy.value = defaultSort.orderBy;
});
</script>

<template>
  <div class="su-table-wrapper">
    <table class="su-table">
      <thead>
        <tr>
          <th
            v-if="checkable"
            :style="{ width: '50px' }"
            :class="['su-table__th', { 'su-table__th--sticky': stickyHeader }]"
          >
            <input ref="checked" v-model="isCheckAll" type="checkbox" @click="handleCheckAll" />
          </th>
          <th
            v-for="(col, colIdx) in tableCols"
            :key="colIdx"
            :style="{ width: `100px`, textAlign: col.align }"
            :class="[
              'su-table__th',
              {
                'su-table__th--sort': col.sort !== 'none',
                'su-table__th--active': col.prop === orderBy && col.sortActive,
                'su-table__th--sticky': stickyHeader
              }
            ]"
            @click="handleSort(col)"
          >
            <slot :name="col.prop + '-th'" :col :row="rows[colIdx]">{{ col.label }}</slot>

            <SIcon
              v-show="hasSortState(col)"
              name="asc"
              width="16"
              height="16"
              :class="['su-table__sort', hasSortState(col) && `su-table__sort--${col.sortBy}`]"
            ></SIcon>
          </th>
        </tr>
      </thead>

      <tbody v-if="tableRows.length">
        <tr v-for="(row, rowIdx) in tableRows" :key="rowIdx" class="su-table__tr">
          <td v-if="checkable" class="su-table__td">
            <input v-model="row.checked" type="checkbox" @click="handleChecked(row as TableRow<T>)" />
          </td>
          <td v-for="(col, colIdx) in tableCols" :key="colIdx" class="su-table__td">
            <slot :name="col.prop" :row="row" :index="rowIdx">{{ col.prop ? row[col.prop] : "" }}</slot>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td class="su-table__td su-table__td--empty" :colspan="tableCols.length">
            <slot name="empty">No Data</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@use "./style";
</style>
