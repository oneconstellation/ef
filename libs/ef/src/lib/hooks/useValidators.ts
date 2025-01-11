import { useRef } from 'react';
import { ValidatorFn } from '../common/types';

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
    return (validators.current[field] || []).reduce((accumulator, fn) => {
      const { hasError, name } = fn(value);

      return {
        ...accumulator,
        [name]: hasError,
      };
    }, {});
  };

  return { registerValidator, validate, hasValidator };
};
