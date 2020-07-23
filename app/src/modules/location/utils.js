import { LocationActionType } from './actions';

function createSagaTakePattern({ path, pattern }) {
  if (path != null) {
    return ({ type, payload }) =>
      type === LocationActionType.LOCATION_CHANGED &&
      payload.location &&
      payload.location.pathname === path;
  } else if (pattern != null) {
    return ({ type, payload }) =>
      type === LocationActionType.LOCATION_CHANGED &&
      payload.location &&
      pattern.test(payload.location.pathname);
  }
  throw new Error(
    'You need to specify one the parameters "path" or "pattern".'
  );
}

export const LocationUtils = {
  createSagaTakePattern,
};
