export interface PaginationProps {
  current?: number;
  perPage?: number;
  total?: number;
  pager?: number;
  rounded?: boolean;
  disabled?: boolean;
}

export type PaginationEmits = (e: "update:current", value: number) => void;
