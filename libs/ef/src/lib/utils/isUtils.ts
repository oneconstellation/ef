export const isString = (value: unknown): value is string => typeof value === 'string';

export const isEmpty = (value: unknown) => {
  return !value || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
};
