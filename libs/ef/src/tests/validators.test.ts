import { expect, test, describe } from 'vitest';
import * as Validators from './../lib/validators';

describe('validators', () => {
  const getFileList = () => {
    const blob = new Blob([''], { type: 'text/html' }) as any;
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';
    const file = <File>blob;
    const fileList: FileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file,
    };
    return fileList;
  };

  const getFile = () => {
    return new File([''], 'filename', { type: 'text/html' });
  };

  describe('min', () => {
    test('should not error on empty string', () => {
      expect(Validators.min(2)('').hasError).toBe(false);
    });
    test('should not error on empty string', () => {
      expect(Validators.min('' as any)(2).hasError).toBe(false);
    });
    test('should not error on null', () => {
      expect(Validators.min(2)(null).hasError).toBe(false);
    });
    test('should not error on null arg', () => {
      expect(Validators.min(null as any)(2).hasError).toBe(false);
    });
    test('should not error on undefined', () => {
      expect(Validators.min(2)(undefined as any).hasError).toBe(false);
    });
    test('should not error on undefined arg', () => {
      expect(Validators.min(undefined)(2).hasError).toBe(false);
    });
    test('should not error on NaN', () => {
      expect(Validators.min(2)('a').hasError).toBe(false);
    });
    test('should not error on empty array', () => {
      expect(Validators.min(2)([] as any).hasError).toBe(false);
    });
    test('should not error on empty object', () => {
      expect(Validators.min(2)({} as any).hasError).toBe(false);
    });
    test('should not error on Date object', () => {
      expect(Validators.min(2)(new Date()).hasError).toBe(false);
    });
    test('should not error on File', () => {
      expect(Validators.min(2)(getFile() as any).hasError).toBe(false);
    });
    test('should not error on FileList', () => {
      expect(Validators.min(2)(getFileList()).hasError).toBe(false);
    });
    test('should not error on bigger than required number', () => {
      expect(Validators.min(2)(3).hasError).toBe(false);
    });
    test('should not error on bigger than required float number', () => {
      expect(Validators.min(2.5)(3.3).hasError).toBe(false);
    });
    test('should not error on equal value', () => {
      expect(Validators.min(2)(2).hasError).toBe(false);
    });
    test('should not error on equal string value', () => {
      expect(Validators.min(2)('2').hasError).toBe(false);
    });
    test('should error on small value', () => {
      expect(Validators.min(2)(1)).toEqual({
        hasError: true,
        name: 'min',
      });
    });
    test('should error on small string value', () => {
      expect(Validators.min(2)('1')).toEqual({
        hasError: true,
        name: 'min',
      });
    });
    test('should error on small float value', () => {
      expect(Validators.min(3.3)(2.2)).toEqual({
        hasError: true,
        name: 'min',
      });
    });
  });
});

describe('basics', () => {
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
