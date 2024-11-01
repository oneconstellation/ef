import { useReducer, Reducer } from 'react';
import { initialState, reducer } from '../state/reducer';
import * as Actions from '../state/actions';
import { AnyAction, State } from '../common/types';

export const useFormState = <T = string>() => {
  const [state, dispatch] = useReducer<Reducer<State, AnyAction>>(reducer, initialState);

  return {
    state,
    getField: (field: T) => state.fields[field],
    setup: (fields: any) => dispatch(Actions.Setup(fields)),
    change: (field: any, value: any) => dispatch(Actions.Change({ field, value })),
    markAsTouched: (field: any) => dispatch(Actions.Touch({ field })),
    disable: (field: any) => dispatch(Actions.Disable({ field })),
    enable: (field: any) => dispatch(Actions.Enable({ field })),
    setErrors: (field: any, errors: Record<string, boolean>) => dispatch(Actions.SetErrors({ field, errors })),
  };
};
