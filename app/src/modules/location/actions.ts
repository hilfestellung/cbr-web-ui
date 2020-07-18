import { createAction } from "redux-actions";
import { Location } from "history";

const LOCATION_CHANGED = "[Location] Changed";

const locationChanged = createAction(
  LOCATION_CHANGED,
  (action: string, location: Location) => ({ action, location })
);

export const LocationActionType = {
  LOCATION_CHANGED,
};

export const LocationAction = {
  locationChanged,
};
