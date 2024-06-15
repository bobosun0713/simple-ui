<script setup lang="ts">
import { ref, useSlots, onMounted, watch, type Component } from "vue";
import { deepClone } from "@simple/utils";
import SIcon from "../icon/Icon.vue";
import type { TableProps, RowProvider, ColumnProvider } from "./types";

defineOptions({
  name: "STable"
});

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  defaultSort: () => ({ orderBy: "", sortBy: "desc" }),
  stickyHeader: false
});

const emit = defineEmits(["on-sort"]);
const slots = useSlots();

const columns = ref<ColumnProvider[]>([]);
const rows = ref([]);
const orderBy = ref("");

watch(
  () => props.data,
  newVal => (rows.value = deepClone(newVal as [])),
  { immediate: true, deep: true }
);

watch(
  () => props.defaultSort,
  newVal => (orderBy.value = newVal.orderBy),
  { immediate: true, deep: true }
);

function transformColumns(): void {
  if (!slots.default) return;

  for (const slot of slots.default()) {
    if ((slot.type as Component).name === "STableColumn") {
      if (slot.props) {
        const sortState =
          "sort" in slot.props && "prop" in slot.props ? props.defaultSort.orderBy === slot.props.prop : "none";

        columns.value.push({
          ...slot.props,
          children: slot.children,
          sort: sortState,
          sortActive: false,
          sortBy: props.defaultSort.sortBy
        });
      } else {
        columns.value.push({ children: slot.children, sort: "none" });
      }
    }
  }

  // Find the currently sorted property,
  // If there are identical props, only the first one will be assigned.
  for (const col of columns.value) {
    if (col.prop === props.defaultSort.orderBy) {
      col.sortActive = true;
      break;
    }
  }
}
function isSortState(col: RowProvider): boolean {
  return col.prop === orderBy.value && !!col.sort && !!col.prop && !!col.sortActive;
}
function handleSort(col: RowProvider): void {
  if (col.sort === "none") return;

  columns.value.forEach(col => {
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

onMounted(() => {
  transformColumns();
});
</script>

<template>
  <div class="su-table-wrapper">
    <table class="su-table">
      <colgroup>
        <col
          v-for="(col, colIdx) in columns"
          :key="colIdx"
          :style="{ width: col.width ? `${col.width}px` : '100px', textAlign: col.align }"
        />
      </colgroup>

      <thead>
        <tr>
          <th
            v-for="(col, colIdx) in columns"
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
            <template v-if="col.children?.th">
              <component :is="col.children?.th"></component>
            </template>

            <template v-else>
              {{ col.label }}
            </template>

            <SIcon
              v-show="isSortState(col)"
              name="asc"
              width="16"
              height="16"
              :class="['su-table__sort', isSortState(col) && `su-table__sort--${col.sortBy}`]"
            ></SIcon>
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="rows.length">
          <tr v-for="(row, rowIdx) in rows" :key="rowIdx" class="su-table__tr">
            <td v-for="(col, colIdx) in columns" :key="colIdx" class="su-table__td">
              <template v-if="typeof col.children === 'object' && col.children?.td">
                <component :is="col.children?.td" :row="rows[rowIdx]" :index="colIdx"></component>
              </template>

              <template v-else>
                {{ col.prop ? row[col.prop] : "" }}
              </template>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td class="su-table__td su-table__td--empty" :colspan="columns.length">
            <slot name="no-result">No Data</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@import "./style/index.scss";
</style>
