import { createSelector } from 'reselect';

const selectObject = (state) => state.object;

const isLoading = createSelector(selectObject, (state) => state.isLoading);
const isSending = createSelector(selectObject, (state) => state.isSending);
const getItems = createSelector(selectObject, (state) => state.items);
const getError = createSelector(selectObject, (state) => state.error);
const getAddCount = createSelector(selectObject, (state) => state.addCount);
const getAdded = createSelector(selectObject, (state) => state.added);

export const ObjectSelector = {
  isLoading,
  isSending,
  getItems,
  getError,
  getAddCount,
  getAdded,
};
