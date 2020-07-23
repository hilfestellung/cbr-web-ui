import { createAction } from 'redux-actions';

const SEARCH = '[Search] Search';
const SEARCH_SUCCESS = '[Search] Search success';
const SEARCH_FAILED = '[Search] Search failed';

const search = createAction(SEARCH, (request) => ({ request }));
const searchSuccess = createAction(SEARCH_SUCCESS, (response) => ({
  response,
}));
const searchFailed = createAction(SEARCH_FAILED, (error) => ({
  error,
}));

export const SearchActionsType = {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
};

export const SearchAction = {
  search,
  searchSuccess,
  searchFailed,
};
