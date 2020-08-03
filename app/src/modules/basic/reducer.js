import { handleActions } from 'redux-actions';
import { BasicActionTypes } from './actions';

export const basicReducer = handleActions(
  {
    [BasicActionTypes.STARTUP]: (state) => ({ ...state, isStarting: true }),
    [BasicActionTypes.STARTUP_SUCCESS]: (
      state,
      { payload: { name, contact, settings, project } }
    ) => ({
      ...state,
      name,
      contact,
      settings,
      project,
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
    name: '',
    contact: '',
    settings: {},
    project: {},
    isStarting: false,
    isStarted: false,
    error: undefined,
  }
);
