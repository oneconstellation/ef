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
  describe('max', () => {
    test('should not error on empty string', () => {
      expect(Validators.max(2)('').hasError).toBe(false);
    });
    test('should not error on empty string', () => {
      expect(Validators.max('' as any)(2).hasError).toBe(false);
    });
    test('should not error on null', () => {
      expect(Validators.max(2)(null).hasError).toBe(false);
    });
    test('should not error on null arg', () => {
      expect(Validators.max(null as any)(2).hasError).toBe(false);
    });
    test('should not error on undefined', () => {
      expect(Validators.max(2)(undefined as any).hasError).toBe(false);
    });
    test('should not error on undefined arg', () => {
      expect(Validators.max(undefined)(2).hasError).toBe(false);
    });
    test('should not error on NaN', () => {
      expect(Validators.max(2)('a').hasError).toBe(false);
    });
    test('should not error on empty array', () => {
      expect(Validators.max(2)([] as any).hasError).toBe(false);
    });
    test('should not error on empty object', () => {
      expect(Validators.max(2)({} as any).hasError).toBe(false);
    });
    test('should not error on Date object', () => {
      expect(Validators.max(2)(new Date()).hasError).toBe(false);
    });
    test('should not error on File', () => {
      expect(Validators.max(2)(getFile() as any).hasError).toBe(false);
    });
    test('should not error on FileList', () => {
      expect(Validators.max(2)(getFileList()).hasError).toBe(false);
    });
    test('should not error on smaller than required number', () => {
      expect(Validators.max(2)(1).hasError).toBe(false);
    });
    test('should not error on smaller than required float number', () => {
      expect(Validators.max(2.5)(2.1).hasError).toBe(false);
    });
    test('should not error on equal value', () => {
      expect(Validators.max(2)(2).hasError).toBe(false);
    });
    test('should not error on equal string value', () => {
      expect(Validators.max(2)('2').hasError).toBe(false);
    });
    test('should error on bigger value', () => {
      expect(Validators.max(2)(3)).toEqual({
        hasError: true,
        name: 'max',
      });
    });
    test('should error on bigger string value', () => {
      expect(Validators.max(2)('3')).toEqual({
        hasError: true,
        name: 'max',
      });
    });
    test('should error on bigger float value', () => {
      expect(Validators.max(3.3)(4.2)).toEqual({
        hasError: true,
        name: 'max',
      });
    });
  });
  describe('minLength', () => {
    test('should not error on empty string', () => {
      expect(Validators.minLength('' as any)('asdf').hasError).toBe(false);
    });
    test('should not error on null', () => {
      expect(Validators.minLength(2)(null).hasError).toBe(false);
    });
    test('should not error on null arg', () => {
      expect(Validators.minLength(null as any)(2).hasError).toBe(false);
    });
    test('should not error on undefined', () => {
      expect(Validators.minLength(2)(undefined as any).hasError).toBe(false);
    });
    test('should not error on undefined arg', () => {
      expect(Validators.minLength(undefined)(2).hasError).toBe(false);
    });
    test('should not error on NaN arg', () => {
      expect(Validators.minLength(NaN)('a').hasError).toBe(false);
    });
    test('should not error on empty object', () => {
      expect(Validators.minLength(2)({} as any).hasError).toBe(false);
    });
    test('should not error on Date object', () => {
      expect(Validators.minLength(2)(new Date()).hasError).toBe(false);
    });
    test('should not error on File', () => {
      expect(Validators.minLength(2)(getFile() as any).hasError).toBe(false);
    });
    test('should not error on FileList', () => {
      expect(Validators.minLength(2)(getFileList()).hasError).toBe(false);
    });
    test('should not error on equal value', () => {
      expect(Validators.minLength(2)('as').hasError).toBe(false);
    });
    test('should not error on longer value', () => {
      expect(Validators.minLength(2)('asd')).toEqual({
        hasError: false,
        name: 'minLength',
      });
    });
    test('should not error error longer than required array', () => {
      expect(Validators.minLength(2)(['a', 's', 'd'] as any).hasError).toBe(false);
    });
    test('should error on too small array', () => {
      expect(Validators.minLength(1)([] as any).hasError).toBe(true);
    });
    test('should error on shorter than required value', () => {
      expect(Validators.minLength(2)('a').hasError).toBe(true);
    });
  });
  describe('maxLength', () => {
    test('should not error on empty string', () => {
      expect(Validators.maxLength('' as any)('asdf').hasError).toBe(false);
    });
    test('should not error on null', () => {
      expect(Validators.maxLength(2)(null).hasError).toBe(false);
    });
    test('should not error on null arg', () => {
      expect(Validators.maxLength(null as any)(2).hasError).toBe(false);
    });
    test('should not error on undefined', () => {
      expect(Validators.maxLength(2)(undefined as any).hasError).toBe(false);
    });
    test('should not error on undefined arg', () => {
      expect(Validators.maxLength(undefined)(2).hasError).toBe(false);
    });
    test('should not error on NaN arg', () => {
      expect(Validators.maxLength(NaN)('a').hasError).toBe(false);
    });
    test('should not error on empty object', () => {
      expect(Validators.maxLength(2)({} as any).hasError).toBe(false);
    });
    test('should not error on Date object', () => {
      expect(Validators.maxLength(2)(new Date()).hasError).toBe(false);
    });
    test('should not error on File', () => {
      expect(Validators.maxLength(2)(getFile() as any).hasError).toBe(false);
    });
    test('should not error on FileList', () => {
      expect(Validators.maxLength(2)(getFileList()).hasError).toBe(false);
    });
    test('should not error on equal value', () => {
      expect(Validators.maxLength(2)('as').hasError).toBe(false);
    });
    test('should not error on shorter value', () => {
      expect(Validators.maxLength(2)('a')).toEqual({
        hasError: false,
        name: 'maxLength',
      });
    });
    test('should not error error shorter than required array', () => {
      expect(Validators.maxLength(2)(['a'] as any).hasError).toBe(false);
    });
    test('should error on too big array', () => {
      expect(Validators.maxLength(1)(['a', 'b'] as any).hasError).toBe(true);
    });
    test('should error on longer than required value', () => {
      expect(Validators.maxLength(2)('asd').hasError).toBe(true);
    });
  });
  describe('email', () => {
    test('should not error on empty string', () => {
      expect(Validators.email()('').hasError).toBe(false);
    });
    test('should not error on null', () => {
      expect(Validators.email()(null).hasError).toBe(false);
    });
    test('should not error on undefined', () => {
      expect(Validators.email()(undefined as any).hasError).toBe(false);
    });
    test('should not error on empty object', () => {
      expect(Validators.email()({} as any).hasError).toBe(false);
    });
    test('should not error on Date object', () => {
      expect(Validators.email()(new Date()).hasError).toBe(false);
    });
    test('should not error on File', () => {
      expect(Validators.email()(getFile() as any).hasError).toBe(false);
    });
    test('should not error on FileList', () => {
      expect(Validators.email()(getFileList()).hasError).toBe(false);
    });
    test('should not error on valid email', () => {
      expect(Validators.email()('test@test.com').hasError).toBe(false);
    });
    test('should error on invalid email', () => {
      expect(Validators.email()('not email address').hasError).toBe(true);
    });
  });
  describe('required', () => {
    test('should error on empty string', () => {
      expect(Validators.required()('').hasError).toBe(true);
    });
    test('should error on null', () => {
      expect(Validators.required()(null).hasError).toBe(true);
    });
    test('should error on undefined', () => {
      expect(Validators.required()(undefined as any).hasError).toBe(true);
    });
    test('should error on empty object', () => {
      expect(Validators.required()({} as any).hasError).toBe(true);
    });
    test('should not error on Date object', () => {
      expect(Validators.required()(new Date()).hasError).toBe(false);
    });
    test('should not error on File', () => {
      expect(Validators.required()(getFile() as any).hasError).toBe(false);
    });
    test('should not error on FileList', () => {
      expect(Validators.required()(getFileList()).hasError).toBe(false);
    });
    test('should not error on string', () => {
      expect(Validators.required()('asdf').hasError).toBe(false);
    });
    test('should not error on number', () => {
      expect(Validators.required()(2).hasError).toBe(false);
    });
  });
});
