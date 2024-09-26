import { ChangeEvent, useCallback, useEffect, FocusEvent, FormEvent } from 'react';
import { pickValue } from '../utils/pickValue';
import { useFormState } from './useFormState';
import { useValidators } from './useValidators';
import { FieldType, ValidatorFn } from '../common/types';

type FieldOptions = {
  disabled?: boolean;
};

type Fields = Record<string, [(string | boolean | number)?, ValidatorFn[]?, options?: FieldOptions]>;

type Options = {
  onSubmit: (values: Record<string, FieldType>) => void;
};

export const useForm = <F extends Fields>(fields: F, options?: Options) => {
  const { setup, state, change, markAsTouched, disable, enable, setErrors } = useFormState();
  const { registerValidator, validate } = useValidators();

  const values = Object.entries(state.fields)
    .map(([key, fieldState]) => ({
      [key]: (fieldState as any).value,
    }))
    .reduce(
      (current, acc) => ({
        ...acc,
        ...current,
      }),
      {}
    );

  const onChangeCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      const { value } = pickValue(event);

      setErrors(name, validate(name, value));
      change(name, value);
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

  const onSubmitCallback = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValid = Object.entries(state.fields)
        .map(([, fieldState]) => (fieldState as any).hasError)
        .every((hasError) => !hasError);

      if (isValid && options?.onSubmit) {
        options?.onSubmit(values);
      }
    },
    [state.fields, values, options]
  );

  useEffect(() => {
    setup(
      Object.entries(fields).map(([name, [value, validators, options]]) => {
        if (validators?.length) {
          registerValidator({ [name]: validators });
        }

        const errors = validate(name, value);

        return {
          name,
          value: value ?? '',
          ...options,
          errors,
          hasError: Object.values(errors).some(Boolean),
        };
      })
    );
  }, []);

  return {
    all: state,
    values,
    form: {
      onSubmit: onSubmitCallback,
    },
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
