import { tooltipProps } from "../tooltip/types";

export const popoverProps = Object.assign({}, tooltipProps, {
  offset: {
    type: [String, Number],
    default: 0
  }
});
