export interface TableColumn {
  prop: string;
  label: string;
  sort?: string | boolean;
  sortBy?: string;
  sortActive?: boolean;
  width?: number | string;
  align?: "start" | "center" | "end";
}

export type TableRow<T> = T & { checked?: boolean };

export interface TableProps<T> {
  modelValue?: unknown[];
  columns: TableColumn[];
  rows: TableRow<T>[];
  defaultSort?: {
    orderBy?: string;
    sortBy?: string;
  };
  checkable?: boolean;
  checkableKey?: string;
  stickyHeader?: boolean | string;
}
