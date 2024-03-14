import { useRef } from "../useRef";
import { rulesContainer, extend } from "./extend";
import { deepClone } from "@simple/utils";
import {
  Schema,
  Values,
  ValuesType,
  Rules,
  RulesType,
  State,
  StateType,
  Validator,
  RegisterRule,
  SubmitCallback,
  UseFormReturnType
} from "./types";

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

async function checkRule(value: unknown, rules: Rules, state: State[string], allValues: Values): Promise<void> {
  state.status = undefined;
  state.message = undefined;

  const isTruthyOrString = (input: unknown) => {
    if (typeof input === "string") return false;
    return !!input;
  };

  if (!Array.isArray(rules)) return;

  for (const rule of rules) {
    if (typeof rule === "function") {
      // The async rule simply waits for asynchronous events, so there is no need to return a reject, just return the message.
      const result = await rule(value);
      state.status = isTruthyOrString(result);
      state.message = typeof result === "string" ? result : undefined;
    } else {
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

    // If the status is false, it means that the validation has failed and the loop is terminated.
    if (!state.status) break;
  }
}

function initValidator(values: Values, rules: RulesType, state: State): Validator {
  return Object.keys(values).reduce((acc: Validator, key: string) => {
    acc[key] = () => checkRule(values[key], rules[key] as Rules, state[key], values);
    return acc;
  }, {});
}

export function useForm(schema: Schema): UseFormReturnType {
  const values: ValuesType = useRef(initialForm(schema, "initialValues"));
  const state: StateType = useRef(initialFormState(schema));
  const rules: RulesType = initialForm(schema, "rules");
  const validator: Validator = initValidator(values.value, rules, state.value);

  const registerRule: RegisterRule = (name, rules, validate) => {
    if (!rules[name]) return console.warn(`[useForm]: The rule ${name} does not exist.`);
    rules[name].push(validate);
  };

  const handleSubmit: SubmitCallback = async cb => {
    state.reset();

    for (const name in validator) {
      // If `validator[name]` is a Promise, it will wait for the validator.
      await validator[name]();
    }

    const isPass = Object.values(state.value)
      .filter(val => val.status !== undefined) // Need to filter out values that have not been added to the rule.
      .every(state => state.status);

    if (typeof cb === "function") cb(isPass);
  };

  const handleReset = (): void => {
    values.reset();
    state.reset();
  };

  return { values, state, validator, registerRule, handleSubmit, handleReset };
}

export const useFormRuleExtend = extend;
