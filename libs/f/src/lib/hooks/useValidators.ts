import { useRef } from 'react';

interface ErrorState {
  hasError: boolean;
  name: string;
}
type FieldTypes = string | number | Date | FileList | null | boolean;

type ValidatorFn = (value: FieldTypes) => ErrorState;

export const useValidators = () => {
  const validators = useRef<Record<string, ValidatorFn[]>>({});

  const registerValidator = (f: Record<string, ValidatorFn[]>) => {
    validators.current = {
      ...validators.current,
      ...f,
    };
  };

  const hasValidator = (field: string) => {
    return !!validators.current[field];
  };

  const validate = (field: string, value: any): Record<string, boolean> => {
    if (hasValidator(field)) {
      return validators.current[field].reduce((accumulator, fn) => {
        const { hasError, name } = fn(value);

        return {
          ...accumulator,
          [name]: hasError,
        };
      }, {});
    }

    return {};
  };

  return { registerValidator, validate };
};
