import { useRef } from "../useRef";
import { ValidateSchema, State, StateType, ValidateState, ValidateStateType, useValidateReturnType } from "./types";

const strategies: Record<string, (...args: any) => string | boolean> = {
  isNonEmpty: function (value, message) {
    if (!value) {
      return message || false;
    }
    return true;
  },
  minLength: function (value, message, length) {
    if (!value || value.length < length) {
      return message || false;
    }
    return true;
  },
  isMobile: function (value, message) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return message || false;
    }
    return true;
  }
};

function checkRule(this: ValidateState[string], state: State, key: string) {
  // Reset status and message.
  this.status = undefined;
  this.message = undefined;

  const verifyRules = (rule: string | boolean) => {
    if (typeof rule === "string") return false;
    return !!rule;
  };

  if (!Array.isArray(this.rules)) return;
  for (const rule of this.rules) {
    if (this.status === false) return;

    if (typeof rule === "function") {
      this.status = verifyRules(rule(state[key] as string));
      this.message =
        typeof rule(state[key] as string) === "string" ? (rule(state[key] as string) as string) : undefined;
      continue;
    }

    const { name, message } = (rule as ValidateState) || {};

    const hasParam = name ? (name as string).split?.(":") : (rule as string).split?.(":");
    const currentRule = hasParam?.shift() || name || rule;

    const strategyParam = hasParam?.length ? [state[key], hasParam.pop(), message] : [state[key], message];
    const strategy = strategies[currentRule as string]?.apply(null, strategyParam);

    this.status = verifyRules(strategy);
    this.message = typeof strategy === "string" ? strategy : undefined;
  }
}

function initialValidate(schema: ValidateSchema, type: any, state?: null | object) {
  return Object.keys(schema).reduce((acc: { [key: string]: unknown }, key) => {
    if (type === "state") acc[key] = null;
    if (type === "validateState")
      acc[key] = {
        rules: schema[key],
        status: undefined,
        message: undefined,
        validate() {
          checkRule.call(this, state as State, key);
        }
      };
    return acc;
  }, {});
}

export function useValidate(schema: ValidateSchema): useValidateReturnType {
  const state: StateType = useRef(initialValidate(schema, "state"));
  const validateState: ValidateStateType = useRef(initialValidate(schema, "validateState", state.value));

  const validate = (cb?: (param?: boolean) => void): void => {
    validateState.reset();

    for (const key in validateState.value) {
      validateState.value[key].validate!();
    }

    const isPass = Object.values(validateState.value).every(state => state.status);

    if (typeof cb === "function") cb(isPass);
  };

  const reset = (): void => {
    state.reset();
    validateState.reset();
  };

  return { validate, validateState, state, reset };
}
