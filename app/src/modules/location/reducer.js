import { handleActions } from 'redux-actions';
import { LocationActionType } from './actions';

const location = window.location;

export const locationReducer = handleActions(
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
    action: 'PUSH',
    location: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: null,
      key: '',
    },
  }
);
