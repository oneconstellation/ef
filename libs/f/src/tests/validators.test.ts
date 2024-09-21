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
});
