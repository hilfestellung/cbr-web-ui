import { handleActions } from "redux-actions";
import { BasicActionTypes } from "./actions";

export interface BasicState {
  name: string;
  contact: string;
  settings: any;
  isStarting: boolean;
  isStarted: boolean;
  error: any;
}
export const basicReducer = handleActions(
  {
    [BasicActionTypes.STARTUP]: (state) => ({ ...state, isStarting: true }),
    [BasicActionTypes.STARTUP_SUCCESS]: (
      state,
      { payload: { name, contact, settings } }
    ) => ({
      ...state,
      name,
      contact,
      settings,
      isStarting: false,
      isStarted: true,
    }),
    [BasicActionTypes.STARTUP_FAILED]: (state, { payload: { error } }) => ({
      ...state,
      error,
      isStarting: false,
      isStarted: false,
    }),
  },
  {
    name: "",
    contact: "",
    settings: {},
    isStarting: false,
    isStarted: false,
    error: undefined,
  }
);
