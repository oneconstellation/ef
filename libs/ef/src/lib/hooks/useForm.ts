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

export const useForm = <FormFields extends Fields>(fields: FormFields, options?: Options) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { setup, state, change, markAsTouched, disable, enable, setErrors, getField } =
    useFormState<keyof FormFields>();
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

  const getFieldByFormRef = (field: keyof FormFields) => {
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
    field: (field: keyof FormFields, options?: FieldOptions) => ({
      name: getField(field)?.name,
      onBlur: onBlurCallback,
      disabled: getField(field)?.disabled,
      ...(options?.watch
        ? {
            onChange: onChangeCallback,
            value: getField(field)?.value ?? '',
          }
        : {
            defaultValue: getField(field)?.value,
          }),
    }),
    radio: (field: keyof FormFields, value: string, options?: Omit<FieldOptions, 'watch'>) => ({
      type: 'radio',
      name: getField(field)?.name,
      onChange: onChangeCallback,
      onBlur: onBlurCallback,
      value,
      checked: getField(field)?.value === value,
      disabled: getField(field)?.disabled,
    }),
    checkbox: (field: keyof FormFields, options?: Omit<FieldOptions, 'watch'>) => ({
      type: 'checkbox',
      name: getField(field)?.name,
      onChange: onChangeCallback,
      onBlur: onBlurCallback,
      value: undefined,
      checked: !!getField(field)?.value,
      disabled: getField(field)?.disabled,
    }),
    get: (field: keyof FormFields) => ({
      ...getField(field),
      disable: () => disable(field),
      enable: () => enable(field),
      value: () => {
        const value = getFieldByFormRef(field)?.value;
        change(state.fields[field].name, value);

        return value;
      },
    }),
    value: (field: keyof FormFields) => getField(field)?.value ?? '',
  };
};
