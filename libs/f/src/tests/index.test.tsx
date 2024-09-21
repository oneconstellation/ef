import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useForm } from '../lib/hooks/useForm';
import { minLength } from '../lib/validators/index';

const TestComponent = () => {
  const f = useForm({
    test: [],
  });

  const { enable, disable } = f.get('test');

  return (
    <>
      <input data-testid={'test'} type="text" {...f.field('test')} />
      <button data-testid="enable-button" onClick={() => enable()} />
      <button data-testid="disable-button" onClick={() => disable()} />
    </>
  );
};

const TestComponentWithValidation = () => {
  const f = useForm({
    test: ['', [minLength(5)]],
  });

  const { hasError } = f.get('test');

  return (
    <>
      <input data-testid={'test'} type="text" {...f.field('test')} />
      {hasError && <p>{'error message'}</p>}
    </>
  );
};

describe('basics', () => {
  test('should have valid name', () => {
    const { result } = renderHook(() =>
      useForm({
        test: [],
      })
    );

    const { name } = result.current.field('test');

    expect(name).toBe('test');
  });

  test('should be enabled by default', () => {
    const { result } = renderHook(() =>
      useForm({
        test: [],
      })
    );

    const { disabled } = result.current.field('test');

    expect(disabled).toBe(false);
  });

  test('should have initial value as provied', () => {
    const initialValue = 'some_initial_value';
    const { result } = renderHook(() =>
      useForm({
        test: [initialValue],
      })
    );

    const { value } = result.current.field('test');

    expect(value).toBe(initialValue);
  });

  test('should change value on type', async () => {
    const typedValue = 'dupa';
    const inputTestId = 'test';

    const user = userEvent.setup();
    const { getByTestId, getByDisplayValue } = render(<TestComponent />);
    const input = getByTestId(inputTestId);

    await user.click(input);
    await user.keyboard(typedValue);

    expect(getByDisplayValue(typedValue).getAttribute('data-testid')).toBe(inputTestId);
  });

  test('should change disabled state', async () => {
    const inputTestId = 'test';

    const user = userEvent.setup();
    const { getByTestId } = render(<TestComponent />);
    const input = getByTestId(inputTestId) as HTMLInputElement;
    const disableButton = getByTestId('disable-button');
    const enableButton = getByTestId('enable-button');

    expect(input.disabled).toBe(false);

    await user.click(disableButton);
    expect(input.disabled).toBe(true);

    await user.click(enableButton);
    expect(input.disabled).toBe(false);
  });
});

describe('validations', () => {
  test('should be valid by default', () => {
    const { result } = renderHook(() =>
      useForm({
        test: [''],
      })
    );

    const { hasError } = result.current.get('test');

    expect(hasError).toBeFalsy();
  });

  test('should be inavlid after typed not enough chars', async () => {
    const user = userEvent.setup();
    const { getByTestId, queryByText } = render(<TestComponentWithValidation />);
    const input = getByTestId('test');

    await user.click(input);
    await user.keyboard('abcd');

    const errorMessage = queryByText('error message');

    expect(errorMessage).toBeTruthy();
  });
});
