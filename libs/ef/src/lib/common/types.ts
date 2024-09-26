export type FieldType = string | number | Date | FileList | null | boolean;

export interface ErrorState {
  hasError: boolean;
  name: string;
}

export type ValidatorFn = (value: FieldType) => ErrorState;