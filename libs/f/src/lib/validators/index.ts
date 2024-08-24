const isString = (value: unknown) => typeof value === 'string';

interface ErrorState {
  hasError: boolean;
  name: string;
}

export const minLength =
  (minLength: number) =>
  (value: unknown): ErrorState => {
    if (isString(value)) {
      return {
        hasError: value.length <= minLength,
        name: 'minLength',
      };
    }

    return {
      hasError: false,
      name: 'minLength',
    };
  };

export const maxLength =
  (maxLength: number) =>
  (value: unknown): ErrorState => {
    if (isString(value)) {
      return {
        hasError: value.length > maxLength,
        name: 'maxLength',
      };
    }

    return {
      hasError: false,
      name: 'maxLength',
    };
  };
