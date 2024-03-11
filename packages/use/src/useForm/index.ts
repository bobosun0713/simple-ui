import { useRef } from "../useRef";
import { rulesContainer, extend } from "./extend";
import { deepClone } from "@simple/utils";
import { Schema, Values, ValuesType, Rules, RulesType, State, StateType, Validator, UseFormReturnType } from "./types";

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

  const isTruthyOrString = (input: unknown) => {
    if (typeof input === "string") return false;
    return !!input;
  };

  if (!Array.isArray(rules)) return;

  for (const rule of rules) {
    if (typeof rule === "function") {
      const result = rule(value);
      state.status = isTruthyOrString(result);
      state.message = typeof result === "string" ? result : undefined;
      continue;
    }

    const { name, message, param } = rule;
    const currentRule = name || rule;

    if (!rulesContainer[currentRule]) continue;

    const strategyResult = rulesContainer[currentRule].apply?.(null, [
      value,
      message,
      // If param is passed, pass param, otherwise pass an empty array to filter parameters
      ...(param ? [param] : []),
      allValues
    ]);

    state.status = isTruthyOrString(strategyResult);
    state.message = typeof strategyResult === "string" ? strategyResult : undefined;
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

    const isPass = Object.values(state.value)
      .filter(val => val.status !== undefined)
      .every(state => state.status);
    if (typeof cb === "function") cb(isPass);
  };

  const handleReset = (): void => {
    values.reset();
    state.reset();
  };

  return { values, state, validator, handleSubmit, handleReset };
}

export const useFormRuleExtend = extend;
