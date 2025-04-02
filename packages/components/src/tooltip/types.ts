import type { PopperProps, PopperEmits } from "../popper/types";

export type TooltipProps = Omit<PopperProps, "arrowOptions">;
export type TooltipEmits = PopperEmits;
