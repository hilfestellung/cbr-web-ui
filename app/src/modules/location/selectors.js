import { createSelector } from 'reselect';

const selectLocation = (state) => state.location;

const getAction = createSelector(
  selectLocation,
  (state) => state && state.action
);
const getLocation = createSelector(
  selectLocation,
  (state) => state && state.location
);
const getSearch = createSelector(
  selectLocation,
  (state) =>
    (state &&
      state.location &&
      state.location.search &&
      Object.fromEntries(new URLSearchParams(state.location.search))) ||
    {}
);

export const LocationSelector = {
  getAction,
  getLocation,
  getSearch,
};
