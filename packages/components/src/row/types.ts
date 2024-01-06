import type { PropType } from "vue";

export type RowJustify = "end" | "center" | "between" | "around";
export type RowAlign = "center" | "bottom";

export const rowProps = {
  justify: {
    type: String as PropType<RowJustify>,
    default: ""
  },
  align: {
    type: String as PropType<RowAlign>,
    default: ""
  },
  gutter: {
    type: [String, Number],
    default: 0
  }
};
