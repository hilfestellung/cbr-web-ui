import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

const isAuthenticated = createSelector(
  selectUser,
  (state) => state.isAuthenticated
);
const getUser = createSelector(selectUser, (state) => state.user);

export const UserSelector = {
  isAuthenticated,
  getUser,
};
