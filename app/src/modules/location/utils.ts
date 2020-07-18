import { ActionPattern } from "redux-saga/effects";

import { LocationActionType } from "./actions";

export interface LocationSagaTakePatternOptions {
  path?: string;
  pattern?: RegExp;
}

function createSagaTakePattern({
  path,
  pattern,
}: LocationSagaTakePatternOptions): ActionPattern {
  if (path != null) {
    return ({ type, payload }: any) =>
      type === LocationActionType.LOCATION_CHANGED &&
      payload.location &&
      payload.location.pathname === path;
  } else if (pattern != null) {
    return ({ type, payload }: any) =>
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
