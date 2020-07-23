import { createAction } from 'redux-actions';

const LOCATION_CHANGED = '[Location] Changed';

const locationChanged = createAction(LOCATION_CHANGED, (action, location) => ({
  action,
  location,
}));

export const LocationActionType = {
  LOCATION_CHANGED,
};

export const LocationAction = {
  locationChanged,
};
