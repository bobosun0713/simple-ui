<script setup lang="ts" generic="T extends { [key: string]: unknown }">
import { ref, onMounted, watch } from "vue";
import { deepClone } from "@simple/utils";
import SIcon from "../icon/Icon.vue";
import type { TableProps, TableColumn } from "./types";

defineOptions({
  name: "STableV2"
});

const {
  rows = [],
  columns = [],
  defaultSort = { orderBy: "", sortBy: "desc" },
  stickyHeader = false
} = defineProps<TableProps<T>>();

const emit = defineEmits(["on-sort"]);

const tableCols = ref<TableColumn[]>([]);
const tableRows = ref<T[]>([]);
const orderBy = ref("");

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

  emit("on-sort", { orderBy: orderBy.value, sortBy: col.sortBy });
}

watch(
  () => rows,
  newVal => (tableRows.value = deepClone(newVal)),
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
      <colgroup>
        <col
          v-for="(col, colIdx) in tableCols"
          :key="colIdx"
          :style="{ width: col.width ? `${col.width}px` : '100px', textAlign: col.align }"
        />
      </colgroup>

      <slot name="thead" :cols="tableCols">
        <thead>
          <tr>
            <th
              v-for="(col, colIdx) in tableCols"
              :key="colIdx"
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
      </slot>

      <slot name="tbody" :rows="tableRows">
        <tbody v-if="tableRows.length">
          <tr v-for="(row, rowIdx) in tableRows" :key="rowIdx" class="su-table__tr">
            <td v-for="(col, colIdx) in tableCols" :key="colIdx" class="su-table__td">
              <slot :name="col.prop" :row="row" :index="rowIdx">{{ col.prop ? row[col.prop] : "" }}</slot>
            </td>
          </tr>
        </tbody>
      </slot>

      <tbody v-if="!tableRows.length">
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
@import "./style/index.scss";
</style>
