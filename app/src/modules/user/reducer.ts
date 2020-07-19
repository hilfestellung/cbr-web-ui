import { handleActions } from "redux-actions";
import { UserActionTypes } from "./actions";

export interface UserState {
  isAuthenticated: boolean;
  user: {
    subject: string;
    tenant: string;
    settings: any;
    permissions: string[];
  };
  error: any;
}

export const userReducer = handleActions(
  {
    [UserActionTypes.USER_AUTHENTICATED]: (
      state,
      { payload: { isAuthenticated, user } }
    ) => ({
      ...state,
      user,
      isAuthenticated,
    }),
    [UserActionTypes.USER_SET_ITEM_SUCCESS]: (
      state,
      { payload: { user } }
    ) => ({
      ...state,
      user,
    }),
  },
  {
    isAuthenticated: false,
    user: undefined,
    error: undefined,
  }
);
