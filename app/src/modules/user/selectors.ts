import { createSelector } from "reselect";
import { UserState } from "./reducer";

const selectUser = (state: any) => state.user as UserState;

const isAuthenticated = createSelector(
  selectUser,
  (state) => state.isAuthenticated
);
const getUser = createSelector(selectUser, (state) => state.user);

export const UserSelector = {
  isAuthenticated,
  getUser,
};
