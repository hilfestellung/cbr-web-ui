import { createAction } from "redux-actions";

const STARTUP = "[Basic] Startup";
const STARTUP_SUCCESS = "[Basic] Startup success";
const STARTUP_FAILED = "[Basic] Startup failed";

const startup = createAction(STARTUP);
const startupSuccess = createAction(
  STARTUP_SUCCESS,
  ({ name, contact, settings }: any) => ({ name, contact, settings })
);
const startupFailed = createAction(STARTUP_FAILED, (error: any) => ({ error }));

export const BasicActions = { startup, startupSuccess, startupFailed };

export const BasicActionTypes = { STARTUP, STARTUP_SUCCESS, STARTUP_FAILED };
