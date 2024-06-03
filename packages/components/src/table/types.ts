export interface RowProvider {
  prop: string;
  sort: string | boolean;
  sortBy: string;
  sortActive: boolean;
}

export interface TableProps {
  data: any[];
  defaultSort?: {
    orderBy: string;
    sortBy: string;
  };
  stickyHeader?: boolean | string;
}

export interface TableColumnProps {
  prop?: string;
  label?: string;
  align?: string;
  width?: number | string;
  sort?: boolean;
}
