import { EMAIL_REGEXP } from '../consts';
import { createValidator } from '../utils/createValidator';
import { isString, isEmpty } from '../utils/isUtils';

export const minLength = createValidator<number>('minLength', (value, minLength) => {
  if (!minLength || Number.isNaN(minLength)) {
    return true;
  }

  if (isString(value) || Array.isArray(value)) {
    return value.length >= minLength;
  }

  return true;
});

export const maxLength = createValidator<number>('maxLength', (value, maxLength) => {
  if (!maxLength || Number.isNaN(minLength)) {
    return true;
  }

  if (isString(value) || Array.isArray(value)) {
    return value.length <= maxLength;
  }

  return true;
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

export const max = createValidator<number>('max', (value, max) => {
  if (isEmpty(value) || isEmpty(max)) {
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

  return parsedValue <= max;
});

export const email = createValidator('email', (value) => {
  if (isEmpty(value)) {
    /**
     * if is empty, pass as valid
     */
    return true;
  }

  if (isString(value)) {
    return EMAIL_REGEXP.test(String(value))
  } 

  return true
});

export const required = createValidator('required', (value) => {
  return !(
    value === null || 
    value === undefined || 
    Object.keys(value).length === 0 && value.constructor === Object ||
    ((typeof value === 'string' || Array.isArray(value)) && value.length === 0)
  );
});
