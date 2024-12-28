import { FieldState, State } from '../common/types';
import * as Action from './consts';

const createFieldState = (
  field: Pick<FieldState, 'name' | 'value' | 'disabled' | 'hasError' | 'errors'>
): FieldState => {
  return {
    name: field.name,
    value: field.value,
    touched: false,
    pristine: true,
    dirty: false,
    disabled: field?.disabled ?? false,
    hasError: field.hasError ?? false,
    errors: field.errors ?? null,
  };
};

export const initialState: State = {
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

    case Action.WATCH:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            watch: action.payload.watch,
          },
        },
      };

    case Action.MAKE_IT_DIRTY:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            dirty: true,
            pristine: false,
          },
        },
      };

    case Action.MAKE_IT_PRISTINE:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            pristine: true,
            dirty: false,
          },
        },
      };

    default:
      return state;
  }
}
