import { EMAIL_REGEXP } from '../consts';
import { createValidator } from '../utils/createValidator';
import { isString, isEmpty } from '../utils/isUtils';

export const minLength = createValidator<number>('minLength', (value, minLength) => {
  if (isString(value)) {
    return value.length >= minLength;
  }
  return false;
});

export const maxLength = createValidator<number>('maxLength', (value, maxLength) => {
  if (isString(value)) {
    return value.length <= maxLength;
  }
  return false;
});

export const min = createValidator<number>('min', (value, min) => {
  if (isEmpty(value) || isEmpty(min)) {
    /**
     * if is empty, pass as valid
     */
    return true;
  }

  const parsedValue = Number.parseFloat(value as string);

  if (isNaN(parsedValue)) {
    /**
     * if is not numer, pass as valid
     */
    return true;
  }

  return parsedValue >= min;
});

export const max = createValidator<number>('max', (value, max) => Number(value) <= max);

export const email = createValidator('email', (value) => EMAIL_REGEXP.test(String(value)));

export const required = createValidator('required', (value) => {
  return !(value === null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0));
});
