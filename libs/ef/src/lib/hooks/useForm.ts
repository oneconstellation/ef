import { ChangeEvent, useCallback, useEffect, FocusEvent, FormEvent, useRef } from 'react';
import { pickValue } from '../utils/pickValue';
import { useFormState } from './useFormState';
import { useValidators } from './useValidators';
import { FieldType, ValidatorFn } from '../common/types';

type FieldOptions = {
  disabled?: boolean;
  watch?: boolean;
};

type Fields = Record<string, [(string | boolean | number)?, ValidatorFn[]?]>;

type Options = {
  onSubmit: (values: Record<string, FieldType>) => void;
};

export const useForm = <F extends Fields>(fields: F, options?: Options) => {
  const formRef = useRef<HTMLFormElement>(null);
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

  const getFieldByFormRef = (field: keyof F) => {
    return formRef.current?.elements.namedItem(field as string) as HTMLInputElement;
  };

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
    const initialState = Object.entries(fields).map(([name, [value, validators]]) => {
      if (validators?.length) {
        registerValidator({ [name]: validators });
      }

      const errors = validate(name, value);
      const field = getFieldByFormRef(name);

      return {
        name,
        value: value ?? field?.value ?? '',
        errors,
        hasError: Object.values(errors).some(Boolean),
        disabled: field?.disabled,
      };
    });

    setup(initialState);
  }, [formRef.current]);

  return {
    all: state,
    values,
    form: {
      onSubmit: onSubmitCallback,
      ref: formRef,
    },
    field: (field: keyof F, options?: FieldOptions) => ({
      name: state.fields[field]?.name,
      onBlur: onBlurCallback,
      disabled: state.fields[field]?.disabled,
      ...(options?.watch
        ? {
            onChange: onChangeCallback,
            value: state.fields[field]?.value ?? '',
          }
        : {
            defaultValue: state.fields[field]?.value,
          }),
    }),
    radio: (field: keyof F, value: string, options?: Omit<FieldOptions, 'watch'>) => ({
      type: 'radio',
      name: state.fields[field]?.name,
      onChange: onChangeCallback,
      onBlur: onBlurCallback,
      value,
      checked: state.fields[field]?.value === value,
      disabled: state.fields[field]?.disabled,
    }),
    checkbox: (field: keyof F, options?: Omit<FieldOptions, 'watch'>) => ({
      type: 'checkbox',
      name: state.fields[field]?.name,
      onChange: onChangeCallback,
      onBlur: onBlurCallback,
      value: undefined,
      checked: !!state.fields[field]?.value,
      disabled: state.fields[field]?.disabled,
    }),
    get: (field: keyof F) => ({
      ...state.fields[field],
      disable: () => disable(field),
      enable: () => enable(field),
      value: () => {
        const value = getFieldByFormRef(field)?.value;
        change(state.fields[field].name, value);

        return value;
      },
    }),
    value: (field: keyof F) => state.fields[field]?.value ?? '',
  };
};
