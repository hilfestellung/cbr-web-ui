import { createSelector } from "reselect";

import { LocationState } from "./reducer";

const selectLocation = (state: any) => state.location as LocationState;

const getAction = createSelector(selectLocation, (state) => state.action);
const getLocation = createSelector(selectLocation, (state) => state.location);

export const LocationSelector = {
  getAction,
  getLocation,
};
