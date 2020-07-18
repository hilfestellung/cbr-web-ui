import { createAction } from "redux-actions";

const SEARCH = "[Search] Search";
const SEARCH_SUCCESS = "[Search] Search success";
const SEARCH_FAILED = "[Search] Search failed";

const search = createAction(SEARCH, (request: any) => ({ request }));
const searchSuccess = createAction(SEARCH_SUCCESS, (response: any) => ({
  response,
}));
const searchFailed = createAction(SEARCH_FAILED, (error: any) => ({
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
