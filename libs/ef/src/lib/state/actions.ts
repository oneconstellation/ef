import { createAction } from '../utils/createAction';
import * as A from './consts';

export const Setup = (payload: any) => createAction(A.SETUP, payload);
export const Change = (payload: { field: string; value: any }) => createAction(A.CHANGE, payload);
export const Touch = (payload: { field: string }) => createAction(A.TOUCH, payload);
export const Disable = (payload: { field: string }) => createAction(A.DISABLE, payload);
export const Enable = (payload: { field: string }) => createAction(A.ENABLE, payload);
export const SetErrors = (payload: { field: string; errors: Record<string, boolean> }) =>
  createAction(A.SET_ERRORS, payload);
export const SetWatch = (payload: { field: string; watch: boolean }) => createAction(A.WATCH, payload);
