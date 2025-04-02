export interface TableColumn {
  prop: string;
  label: string;
  sort?: string | boolean;
  sortBy?: string;
  sortActive?: boolean;
  width?: number | string;
  align?: "start" | "center" | "end";
}

export interface TableRow<T> {
  [key: string]: T | boolean | undefined;
  checked?: boolean;
}

export interface TableProps<T> {
  selected?: unknown[];
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

export interface TableEmits {
  (e: "update:sort", value: TableProps<unknown>["defaultSort"]): void;
  (e: "update:selected", value: unknown[]): void;
}
