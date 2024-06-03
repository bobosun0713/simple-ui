import { useRef } from "../";
import { rulesContainer, extend } from "./extend";
import {
  Schema,
  Values,
  ValuesType,
  RulesType,
  State,
  StateType,
  Validator,
  RegisterRule,
  SubmitCallback,
  UseFormReturnType
} from "./types";

function initialFormState(schema: Schema): State {
  const values = schema.initialValues;
  if (!values) return {};
  return Object.keys(values).reduce((acc: State, key) => {
    acc[key] = {
      status: undefined,
      message: undefined
    };
    return acc;
  }, {});
}

async function checkRule(
  value: unknown,
  rules: RulesType[string],
  state: State[string],
  allValues: Values
): Promise<void> {
  state.status = undefined;
  state.message = undefined;

  const isTruthyOrString = (input: unknown): boolean => {
    if (typeof input === "string") return false;
    return !!input;
  };

  if (!Array.isArray(rules)) return;

  for (const rule of rules) {
    let result: string | boolean | undefined = undefined;

    if (typeof rule === "string") result = rulesContainer[rule].call?.(null, value);

    // The async rule simply waits for asynchronous events, so there is no need to return a reject, just return the message.
    // eslint-disable-next-line @typescript-eslint/await-thenable
    if (typeof rule === "function") result = await rule(value, allValues);

    if (typeof rule === "object") {
      const { name, message, param } = rule;

      result = rulesContainer[name].apply?.(null, [
        value,
        message,
        // If param is passed, pass param, otherwise pass an empty array to filter parameters
        ...(param ? [param] : []),
        allValues
      ]);
    }

    state.status = isTruthyOrString(result);
    state.message = typeof result === "string" ? result : undefined;

    // If the status is false skip next rule
    if (!state.status) break;
  }
}

function initValidator(rules: RulesType, values: Values, state: State): Validator {
  return Object.keys(values).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = checkRule(values[key], rules[key], state[key], values);
    return acc;
  }, {} as Validator);
}

export function useForm(schema: Schema): UseFormReturnType {
  const values: ValuesType = useRef(schema.initialValues);
  const state: StateType = useRef(initialFormState(schema));
  const rules: RulesType = schema.rules ?? {};
  const validator: Validator = initValidator(rules, values.value, state.value);

  const registerRule: RegisterRule = (name, validate) => {
    if (rules[name]) rules[name].push(validate);
    else rules[name] = [validate];
  };

  const handleSubmit: SubmitCallback = async cb => {
    state.reset();

    for (const name in validator) {
      // If `validator[name]` is a Promise, it will wait for the validator.
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await validator[name]();
    }

    const isPass = Object.values(state.value)
      .filter(Boolean) // Need to filter out values that have not been added to the rule.
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
