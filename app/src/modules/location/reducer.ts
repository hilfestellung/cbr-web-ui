import { handleActions } from "redux-actions";
import { LocationActionType } from "./actions";
import { Location } from "history";

const location = window.location;

export interface LocationState {
  action: string;
  location: Location;
}

export const locationReducer = handleActions<LocationState>(
  {
    [LocationActionType.LOCATION_CHANGED]: (
      state,
      { payload: { action, location } }
    ) => ({
      ...state,
      action,
      location,
    }),
  },
  {
    action: "PUSH",
    location: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: null,
      key: "",
    },
  }
);
