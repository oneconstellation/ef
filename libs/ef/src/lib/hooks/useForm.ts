import { ChangeEvent, useCallback, FocusEvent, FormEvent, useRef, useState } from 'react';
import { pickValue } from '../utils/pickValue';
import { useFormState } from './useFormState';
import { useValidators } from './useValidators';
import { FieldType, ValidatorFn } from '../common/types';
import { useRunOnce } from './useRunOnce';

interface FieldOptions {
  watch?: boolean;
}

type Fields = Record<string, [(string | boolean | number)?, ValidatorFn[]?]>;

interface Options {
  onSubmit: (values: Record<string, FieldType>) => void;
}

export const useForm = <FormFields extends Fields>(fields: FormFields, options?: Options) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { setup, state, change, markAsTouched, disable, enable, setErrors, getFieldState, setWatchStatus, SetDirty } =
    useFormState<keyof FormFields & string>();
  const { registerValidator, validate, hasValidator } = useValidators();
  const fieldsOptionsRef = useRef<Record<string, FieldOptions>>({});

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
    return formRef.current?.elements.namedItem(field as string) as HTMLInputElement | null;
  };

  const onChangeCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      const { value, files } = pickValue(event);

      if (hasValidator(name)) {
        setErrors(name, validate(name, value));
      }

      change(name, files ?? value);

      if (state.fields[name].pristine) {
        SetDirty(name);
      }
    },
    [validate, change, setErrors]
  );

  const onFocusCallback = useCallback(
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
        .map(([field, fieldState]) => {
          if (!fieldState.watch) {
            const value = getFieldByFormRef(field)?.value;
            setErrors(field, validate(field, value));
            change(field, value);
          }
          return (fieldState as any).hasError;
        })
        .every((hasError) => !hasError);

      if (isValid && options?.onSubmit) {
        options?.onSubmit(values);
      }
    },
    [state.fields]
  );

  useRunOnce(() => {
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

    Object.entries(fieldsOptionsRef.current).forEach(([field, options]) => {
      setWatchStatus(field, Boolean(options?.watch));
    });
  }, [formRef.current, fieldsOptionsRef]);

  return {
    all: state,
    values,
    form: {
      onSubmit: onSubmitCallback,
      ref: formRef,
    },
    field: (field: keyof FormFields & string, options?: FieldOptions) => {
      fieldsOptionsRef.current = {
        ...fieldsOptionsRef.current,
        [field]: options ?? {},
      };
      return {
        name: getFieldState(field)?.name,
        onFocus: onFocusCallback,
        disabled: getFieldState(field)?.disabled,
        ...(options?.watch
          ? {
              onChange: onChangeCallback,
              value: (getFieldState(field)?.value ?? '') as any,
            }
          : {
              defaultValue: getFieldState(field)?.value as any,
            }),
      };
    },
    file: (field: keyof FormFields & string) => ({
      type: 'file',
      name: getFieldState(field)?.name,
      onFocus: onFocusCallback,
      disabled: getFieldState(field)?.disabled,
      onChange: onChangeCallback,
    }),
    radio: (field: keyof FormFields & string, value: string) => ({
      type: 'radio',
      name: getFieldState(field)?.name,
      onChange: onChangeCallback,
      onFocus: onFocusCallback,
      value,
      checked: getFieldState(field)?.value === value,
      disabled: getFieldState(field)?.disabled,
    }),
    checkbox: (field: keyof FormFields & string) => ({
      type: 'checkbox',
      name: getFieldState(field)?.name,
      onChange: onChangeCallback,
      onFocus: onFocusCallback,
      value: undefined,
      checked: !!getFieldState(field)?.value,
      disabled: getFieldState(field)?.disabled,
    }),
    get: (field: keyof FormFields & string) => ({
      ...getFieldState(field),
      disable: () => disable(field),
      enable: () => enable(field),
      valueByRef: () => {
        const value = getFieldByFormRef(field)?.value;
        setErrors(field, validate(field, value));
        change(state.fields[field].name, value);

        return value;
      },
    }),
    value: (field: keyof FormFields & string) => getFieldState(field)?.value ?? '',
  };
};
