import { type Ref } from "vue";

export interface FormSchema {
  [key: string]: {
    [key: string]: unknown;
  };
}

export interface Values {
  [key: string]: unknown;
}

export type ValuesType = Ref<Values> & { reset: () => void };

export interface Rules {
  [key: string]: Array<{ [key: string]: unknown } & string>;
}

export type RulesType = FormSchema[string];

export interface State {
  [key: string]: {
    status?: boolean;
    message?: string;
  };
}
export type StateType = Ref<State> & { reset: () => void };

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
