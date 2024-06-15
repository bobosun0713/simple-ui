export interface ColumnProvider {
  children?: any;
  sort?: string | boolean;
  sortBy?: string;
  sortActive?: boolean;
  prop?: string;
  label?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
}

export interface RowProvider extends Pick<ColumnProvider, "sort" | "sortBy" | "sortActive"> {
  prop?: string;
}

export interface TableProps {
  data?: Record<string, unknown>[];
  defaultSort?: {
    orderBy: string;
    sortBy: string;
  };
  stickyHeader?: boolean | string;
}

export type TableColumnProps = Omit<ColumnProvider, "sortActive" | "sortBy">;
