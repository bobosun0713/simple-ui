import { useRef } from "../useRef";
import { deepClone } from "@simple/utils";
import { Schema, Values, ValuesType, Rules, RulesType, State, StateType, Validator, UseFormReturnType } from "./types";

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

function initialForm(schema: Schema, type: keyof Schema): { [key: string]: unknown } {
  if (typeof schema === "object" && !schema[type]) return {};
  return Object.keys(schema[type]).reduce((acc: { [key: string]: unknown }, key) => {
    acc[key] = deepClone(schema[type][key]);
    return acc;
  }, {});
}

function initialFormState(schema: Schema): State {
  const values = schema["initialValues"];
  if (!values) return {};
  return Object.keys(values).reduce((acc: State, key) => {
    acc[key] = {
      status: undefined,
      message: undefined
    };
    return acc;
  }, {});
}

function checkRule(value: unknown, rules: Rules, state: State[string], allValues: Values): void {
  state.status = undefined;
  state.message = undefined;

  const verify = (rule: string | boolean) => {
    if (typeof rule === "string") return false;
    return !!rule;
  };

  if (!Array.isArray(rules)) return;

  for (const rule of rules) {
    if (typeof rule === "function") {
      state.status = verify(rule(value));
      state.message = typeof rule(value) === "string" ? rule(value) : undefined;
      continue;
    }

    const { name, message, param } = rule || {};

    const currentRule = name || rule;
    const strategyParam = [value, message, param, allValues];
    const strategy = strategies[currentRule].apply?.(null, strategyParam);

    state.status = verify(strategy);
    state.message = typeof strategy === "string" ? strategy : undefined;
  }
}

function initValidator(values: Values, rules: Rules, state: State): Validator {
  return Object.keys(values).reduce((acc: Validator, key: string) => {
    acc[key] = () => {
      checkRule(values[key] as Values, rules[key] as unknown as Rules, state[key], values);
    };
    return acc;
  }, {});
}

export function useForm(schema: Schema): UseFormReturnType {
  const values: ValuesType = useRef(initialForm(schema, "initialValues"));
  const rules: RulesType = initialForm(schema, "rules");
  const state: StateType = useRef(initialFormState(schema));
  const validator: Validator = initValidator(values.value, rules as Rules, state.value);

  const handleSubmit = (cb?: (param?: boolean) => void): void => {
    state.reset();

    for (const name in validator) {
      validator[name]();
    }

    const isPass = Object.values(state.value).every(state => state.status);
    if (typeof cb === "function") cb(isPass);
  };

  const handleReset = (): void => {
    values.reset();
    state.reset();
  };

  return { values, state, validator, handleSubmit, handleReset };
}
