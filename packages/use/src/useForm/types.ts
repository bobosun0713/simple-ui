import { type Ref } from "vue";

export interface FormSchema {
  [key: string]: {
    [key: string]: unknown;
  };
}

export interface values {
  [key: string]: null | string | number | boolean;
}
export type ValuesType = Ref<State> & { reset: () => void };

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
