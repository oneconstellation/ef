import { FieldType } from '../common/types';
import * as Action from './consts';

type Name = string;

interface FieldState {
  name: string;
  value: FieldType;
  touched: boolean;
  disabled: boolean;
  hasError: boolean;
  errors: Record<string, boolean> | null;
  watch: boolean;
}

interface State {
  fields: Record<Name, FieldState>;
}

const createFieldState = (
  field: Pick<FieldState, 'name' | 'value' | 'disabled' | 'hasError' | 'errors' | 'watch'>
): FieldState => {
  return {
    name: field.name,
    value: field.value,
    touched: false,
    disabled: field?.disabled ?? false,
    hasError: field.hasError ?? false,
    errors: field.errors ?? null,
    watch: field.watch ?? true,
  };
};

export const initialState = {
  fields: {},
};

export function reducer(state: State, action: { type: string; payload: any }) {
  switch (action.type) {
    case Action.SETUP:
      return {
        ...state,
        fields: {
          ...action.payload
            .map(createFieldState)
            .reduce(
              (fields: Record<string, FieldState>, field: FieldState) => ({ ...fields, [field.name]: field }),
              {}
            ),
        },
      };

    case Action.CHANGE:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            value: action.payload.value,
          },
        },
      };

    case Action.TOUCH:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            touched: true,
          },
        },
      };

    case Action.DISABLE:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            disabled: true,
          },
        },
      };

    case Action.ENABLE:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            disabled: false,
          },
        },
      };

    case Action.SET_ERRORS:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            errors: action.payload.errors,
            hasError: Object.values(action.payload.errors).some(Boolean),
          },
        },
      };

    default:
      return state;
  }
}
