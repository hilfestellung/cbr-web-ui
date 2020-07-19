import { createAction } from "redux-actions";

const USER_AUTHENTICATED = "[User] Authenticated";
const USER_SET_ITEM = "[User] Set item";
const USER_SET_ITEM_SUCCESS = "[User] Set item success";
const USER_SET_ITEM_FAILED = "[User] Set item failed";
const USER_REMOVE_ITEM = "[User] Remove item";
const USER_REMOVE_ITEM_SUCCESS = "[User] Remove item success";
const USER_REMOVE_ITEM_FAILED = "[User] Remove item failed";

const userAuthenticated = createAction(
  USER_AUTHENTICATED,
  (isAuthenticated: boolean, user: any) => ({
    isAuthenticated,
    user,
  })
);

const userSetItem = createAction(USER_SET_ITEM, (name: string, value: any) => ({
  name,
  value,
}));
const userSetItemSuccess = createAction(USER_SET_ITEM_SUCCESS, (user: any) => ({
  user,
}));
const userSetItemFailed = createAction(USER_SET_ITEM_FAILED, (error: any) => ({
  error,
}));
const userRemoveItem = createAction(USER_REMOVE_ITEM, (name: string) => ({
  name,
}));
const userRemoveItemSucces = createAction(
  USER_REMOVE_ITEM_SUCCESS,
  (user: any) => ({
    user,
  })
);
const userRemoveItemFailed = createAction(
  USER_REMOVE_ITEM_FAILED,
  (error: any) => ({
    error,
  })
);

export const UserAction = {
  userAuthenticated,
  userSetItem,
  userSetItemSuccess,
  userSetItemFailed,
  userRemoveItem,
  userRemoveItemSucces,
  userRemoveItemFailed,
};

export const UserActionTypes = {
  USER_AUTHENTICATED,
  USER_SET_ITEM,
  USER_SET_ITEM_SUCCESS,
  USER_SET_ITEM_FAILED,
  USER_REMOVE_ITEM,
  USER_REMOVE_ITEM_SUCCESS,
  USER_REMOVE_ITEM_FAILED,
};
