import { takeEvery, getContext, call } from "redux-saga/effects";
import { SearchAction } from "./actions";
import getLogger from "../../utils/logger";

const logger = getLogger("search");

export interface SearchConfig {
  location: { path?: string; pattern?: RegExp };
}

function* searchSaga() {
  const authentication = yield getContext("authentication");

  const idToken = (yield call([authentication, "getIdTokenClaims"])).__raw;
  logger.debug("Search using id token", idToken);
  const response: Response = yield call(
    fetch,
    "https://api.case-based-reasoning.org/",
    {
      headers: {
        Authorization: "Bearer " + idToken,
      },
    }
  );
  logger.debug("Response data", yield response.json());
}

export function* watchSearchActions() {
  const searchConfig: SearchConfig = yield getContext("searchConfig");
  yield takeEvery(SearchAction.search, searchSaga);
}
