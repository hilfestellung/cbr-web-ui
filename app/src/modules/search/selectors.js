import { createSelector } from 'reselect';

const selectSearch = (state) => state.search;

const getRequest = createSelector(selectSearch, (state) => state.request);
const getResponse = createSelector(selectSearch, (state) => state.response);
const getError = createSelector(selectSearch, (state) => state.error);
const isSearching = createSelector(selectSearch, (state) => state.isSearching);

export const SearchSelector = {
  getRequest,
  getResponse,
  getError,
  isSearching,
};
