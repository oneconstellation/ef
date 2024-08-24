import { ChangeEvent, useCallback, useEffect, FocusEvent } from 'react';
import { pickValue } from '../utils/pickValue';
import { useFormState } from './useFormState';
import { useValidators } from './useValidators';

interface ErrorState {
  hasError: boolean;
  name: string;
}

type FieldTypes = string | number | Date | FileList | null | boolean;
type ValidatorFn = (value: FieldTypes) => ErrorState;
type FieldOptions = {
  disabled?: boolean;
};
type Fields = Record<string, [(string | boolean | number)?, ValidatorFn[]?, options?: FieldOptions]>;

export const useForm = <F extends Fields>(fields: F) => {
  const { setup, state, change, markAsTouched, disable, enable, setErrors } = useFormState();
  const { registerValidator, validate } = useValidators();

  const onChangeCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const field = event.target.name;
      const value = pickValue(event).value;

      setErrors(field, validate(field, value));
      change(field, value);
    },
    [validate, change, setErrors]
  );

  const onBlurCallback = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const field = (event.target as HTMLInputElement).name;
      if (!state.fields[field].touched) {
        markAsTouched(field);
      }
    },
    [state.fields, markAsTouched]
  );

  useEffect(() => {
    setup(
      Object.entries(fields).map(([name, [value, validators, options]]) => {
        if (validators?.length) {
          registerValidator({ [name]: validators });
        }
        return {
          name,
          value: value ?? '',
          ...options,
        };
      })
    );
  }, []);

  return {
    all: state,
    values: Object.entries(state.fields).map(([key, fieldState]) => ({
      [key]: (fieldState as any).value,
    })),
    field: (field: keyof F) => ({
      value: state.fields[field]?.value ?? '',
      name: state.fields[field]?.name,
      onChange: onChangeCallback,
      onBlur: onBlurCallback,
      disabled: state.fields[field]?.disabled,
    }),
    radio: (field: keyof F, value: string) => ({
      type: 'radio',
      name: state.fields[field]?.name,
      onChange: onChangeCallback,
      value,
      checked: state.fields[field]?.value === value,
      onBlur: onBlurCallback,
      disabled: state.fields[field]?.disabled,
    }),
    checkbox: (field: keyof F) => ({
      type: 'checkbox',
      name: state.fields[field]?.name,
      onChange: onChangeCallback,
      value: undefined,
      checked: !!state.fields[field]?.value,
      onBlur: onBlurCallback,
      disabled: state.fields[field]?.disabled,
    }),
    get: (field: keyof F) => ({
      ...state.fields[field],
      disable: () => disable(field),
      enable: () => enable(field),
    }),
    value: (field: keyof F) => state.fields[field]?.value ?? '',
  };
};
