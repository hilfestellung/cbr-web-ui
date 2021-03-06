import { handleActions } from 'redux-actions';
import { SearchActionsType } from './actions';

const EMPTY_RESULT = {
  count: 0,
  cases: [],
};

export const searchReducer = handleActions(
  {
    [SearchActionsType.SEARCH]: (state, { payload: { request } }) => ({
      ...state,
      request,
      isSearching: true,
      error: null,
    }),
    [SearchActionsType.SEARCH_SUCCESS]: (state, { payload: { response } }) => ({
      ...state,
      response,
      isSearching: false,
    }),
    [SearchActionsType.SEARCH_FAILED]: (state, { payload: { error } }) => ({
      ...state,
      error,
      response: EMPTY_RESULT,
      isSearching: false,
    }),
  },
  {
    request: {},
    response: EMPTY_RESULT,
    error: null,
    isSearching: false,
  }
);
