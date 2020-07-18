import { createSelector } from "reselect";

import { LocationState } from "./reducer";

const selectLocation = (state: any) => state.location as LocationState;

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
