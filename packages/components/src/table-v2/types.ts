export interface TableColumn {
  prop: string;
  label: string;
  sort?: string | boolean;
  sortBy?: string;
  sortActive?: boolean;
  width?: number | string;
  align?: "start" | "center" | "end";
}

export interface TableProps<T> {
  rows: T[];
  columns: TableColumn[];
  defaultSort?: {
    orderBy?: string;
    sortBy?: string;
  };
  stickyHeader?: boolean | string;
}
