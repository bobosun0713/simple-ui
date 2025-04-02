import type { PopperProps, PopperEmits } from "../popper/types";

export type PopoverProps = Omit<PopperProps, "arrowOptions">;
export type PopoverEmits = PopperEmits;
