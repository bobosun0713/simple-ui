import { type Ref } from "vue";

export interface Schema {
  initialValues: {
    [key: string]: unknown;
  };
  rules: Rules;
}

export interface Values {
  [key: string]: unknown;
}

export type ValuesType = Ref<Values> & { reset: () => void };

export interface Rules {
  [key: string]: Array<{ name: string; message?: string; param?: unknown } | string>;
}

export interface RulesType {
  [key: string]: unknown;
}

export interface State {
  [key: string]: {
    status?: boolean;
    message?: string;
  };
}
export type StateType = Ref<State> & { reset: () => void };

export type Validate = (value: any, message: string, ...args: any[]) => string | boolean;

export interface Validator {
  [key: string]: () => void;
}

export interface UseFormReturnType {
  values: ValuesType;
  state: StateType;
  validator: Validator;
  handleSubmit: (cb?: (param?: boolean) => void) => void;
  handleReset: () => void;
}
