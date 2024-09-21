import { createValidator } from '../utils/createValidator';
import { isString } from '../utils/isUtils';

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
