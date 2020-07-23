import { handleActions } from 'redux-actions';
import { UserActionType } from './actions';

export const userReducer = handleActions(
  {
    [UserActionType.USER_AUTHENTICATED]: (
      state,
      { payload: { isAuthenticated, user } }
    ) => ({
      ...state,
      user,
      isAuthenticated,
    }),
    [UserActionType.USER_SET_ITEM_SUCCESS]: (state, { payload: { user } }) => ({
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
