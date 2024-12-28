import { useReducer, Reducer } from 'react';
import { initialState, reducer } from '../state/reducer';
import * as Actions from '../state/actions';
import { AnyAction, State } from '../common/types';

export const useFormState = <T extends string>() => {
  const [state, dispatch] = useReducer<Reducer<State, AnyAction>>(reducer, initialState);

  return {
    state,
    getFieldState: (field: T) => state.fields[field],
    setup: (fields: any) => dispatch(Actions.Setup(fields)),
    change: (field: T, value: any) => dispatch(Actions.Change({ field, value })),
    markAsTouched: (field: T) => dispatch(Actions.Touch({ field })),
    disable: (field: T) => dispatch(Actions.Disable({ field })),
    enable: (field: T) => dispatch(Actions.Enable({ field })),
    setErrors: (field: T, errors: Record<string, boolean>) => dispatch(Actions.SetErrors({ field, errors })),
    setWatchStatus: (field: T, watch: boolean) => dispatch(Actions.SetWatch({ field, watch })),
    SetPristine: (field: T) => dispatch(Actions.SetPristine({ field })),
    SetDirty: (field: T) => dispatch(Actions.SetDirty({ field })),
  };
};
