import { ChangeEvent } from 'react';

export const pickValue = <T extends HTMLInputElement>(event: ChangeEvent<T>) => {
  const { type, value, valueAsDate, valueAsNumber, checked, files } = event.target as T;

  if (isDateTargetType(type)) {
    return { value, asDate: valueAsDate ?? undefined };
  }

  if (isNumberTargetType(type)) {
    return { value: valueAsNumber };
  }

  if (isCheckboxTargetType(type)) {
    return { value: checked ? true : false };
  }

  if (isFileTargetValue(type)) {
    return { value, files };
  }

  return { value };
};

const isDateTargetType = (type: string): boolean => {
  switch (type) {
    case 'date':
    case 'time':
    case 'week':
    case 'month':
    case 'datetime-local':
      return true;
    default:
      return false;
  }
};

const isNumberTargetType = (type: string): boolean => {
  switch (type) {
    case 'number':
      return true;
    default:
      return false;
  }
};

const isCheckboxTargetType = (type: string): boolean => {
  switch (type) {
    case 'checkbox':
      return true;
    default:
      return false;
  }
};

const isFileTargetValue = (type: string): boolean => {
  switch (type) {
    case 'file':
      return true;
    default:
      return false;
  }
};
