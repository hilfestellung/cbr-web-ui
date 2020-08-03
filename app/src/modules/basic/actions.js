import { createAction } from 'redux-actions';

const STARTUP = '[Basic] Startup';
const STARTUP_SUCCESS = '[Basic] Startup success';
const STARTUP_FAILED = '[Basic] Startup failed';

const startup = createAction(STARTUP);
const startupSuccess = createAction(
  STARTUP_SUCCESS,
  ({ name, contact, settings, project }) => ({
    name,
    contact,
    settings,
    project,
  })
);
const startupFailed = createAction(STARTUP_FAILED, (error) => ({ error }));

export const BasicActions = { startup, startupSuccess, startupFailed };

export const BasicActionTypes = { STARTUP, STARTUP_SUCCESS, STARTUP_FAILED };
