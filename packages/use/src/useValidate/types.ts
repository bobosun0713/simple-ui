import { type Ref } from "vue";

export interface ValidateSchema {
  [key: string]: Array<{ name: string; message: string } | string> | Array<(val?: string) => string | boolean>;
}

export interface State {
  [key: string]: null | string | number | boolean;
}

export type StateType = Ref<State> & { reset: () => void };

export interface ValidateState {
  [key: string]: {
    rules?: ValidateSchema[string];
    status?: boolean;
    message?: string;
    validate?: () => void;
  };
}

export type ValidateStateType = Ref<ValidateState> & { reset: () => void };

export interface useValidateReturnType {
  validate: (cb?: (param?: boolean) => void) => void;
  validateState: ValidateStateType;
  state: StateType;
  reset: () => void;
}
