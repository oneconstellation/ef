import { ErrorState, FieldType } from '../common/types';

export const createValidator =
  <T = never>(name: string, isValidFn: (value: FieldType, arg: T) => boolean) =>
  (arg?: T) =>
  (value: FieldType): ErrorState => ({
    name,
    hasError: !isValidFn(value, arg as T),
  });
