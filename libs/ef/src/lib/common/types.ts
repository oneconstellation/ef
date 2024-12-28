export type FieldType = string | number | Date | FileList | null | boolean;

export interface ErrorState {
  hasError: boolean;
  name: string;
}

export type ValidatorFn = (value: FieldType) => ErrorState;

export type Name = string;

export interface FieldState {
  name: string;
  value: FieldType;
  touched: boolean;
  pristine: boolean;
  dirty: boolean;
  disabled: boolean;
  hasError: boolean;
  errors: Record<string, boolean> | null;
  watch?: boolean;
}

export interface State {
  fields: Record<any, FieldState>;
}

export type AnyAction = any;
