import * as rules from "./rules";
import { Validate } from "./types";

export const rulesContainer: Record<string, Validate> = {
  ...rules
};

export function extend(name: string, validate: Validate) {
  if (typeof validate !== "function") {
    throw new Error("[useForm]: validator must be a function");
  }

  rulesContainer[name] = validate;
}
