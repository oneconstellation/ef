import { expect, test, describe } from 'vitest';
import * as Validators from './../lib/validators';

describe('validators', () => {
  test('should correctly validate - minLength', () => {
    const validate = Validators.minLength(5);

    const valid = validate('abcde');
    const invalid = validate('abcd');

    expect(valid.hasError).toBe(false);
    expect(valid.name).toBe('minLength');

    expect(invalid.hasError).toBe(true);
    expect(invalid.name).toBe('minLength');
  });

  test('should correctly validate - maxLength', () => {
    const validate = Validators.maxLength(5);

    const valid = validate('ab');
    const invalid = validate('abcdefg');

    expect(valid.hasError).toBe(false);
    expect(valid.name).toBe('maxLength');

    expect(invalid.hasError).toBe(true);
    expect(invalid.name).toBe('maxLength');
  });

  test('should correctly validate - min', () => {
    const validate = Validators.min(5);

    const valid = validate(10);
    const invalid = validate(3);

    expect(valid.hasError).toBe(false);
    expect(valid.name).toBe('min');

    expect(invalid.hasError).toBe(true);
    expect(invalid.name).toBe('min');
  });

  test('should correctly validate - max', () => {
    const validate = Validators.max(5);

    const valid = validate(4);
    const invalid = validate(10);

    expect(valid.hasError).toBe(false);
    expect(valid.name).toBe('max');

    expect(invalid.hasError).toBe(true);
    expect(invalid.name).toBe('max');
  });

  test('should correctly validate - email', () => {
    const validate = Validators.email();

    const valid = validate('john.doe@something.tld');
    const invalid = validate('abcd@');

    expect(valid.hasError).toBe(false);
    expect(valid.name).toBe('email');

    expect(invalid.hasError).toBe(true);
    expect(invalid.name).toBe('email');
  });

  test('should correctly validate - required', () => {
    const validate = Validators.required();

    const valid = validate('some value');
    const invalid = validate(null);

    expect(valid.hasError).toBe(false);
    expect(valid.name).toBe('required');

    expect(invalid.hasError).toBe(true);
    expect(invalid.name).toBe('required');
  });
});
