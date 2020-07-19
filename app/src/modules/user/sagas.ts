import { getContext, put, call, takeEvery, select } from "redux-saga/effects";
import { waitForCondition } from "../../utils/sagas";
import { UserAction, UserActionTypes } from "./actions";
import { UserSelector } from "./selectors";

function* setItemSaga({ payload: { name, value } }: any) {
  const apiBaseUrl = yield getContext("apiBaseUrl");
  const authentication = yield getContext("authentication");

  const user = yield select(UserSelector.getUser);
  const settings = { ...user.settings, [name]: value };

  const idToken = (yield call([authentication, "getIdTokenClaims"])).__raw;
  const response: Response = yield fetch(`${apiBaseUrl}/me`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + idToken,
    },
    body: JSON.stringify({ settings }),
  });
  const json = yield response.json();
  if (response.status > 399) {
    yield put(UserAction.userSetItemFailed(json));
  } else {
    yield put(UserAction.userSetItemSuccess(json));
  }
}

function* removeItemSaga({ payload: { name } }: any) {
  const apiBaseUrl = yield getContext("apiBaseUrl");
  const authentication = yield getContext("authentication");

  const user = yield select(UserSelector.getUser);
  const settings = { ...user.settings };
  delete settings[name];

  const idToken = (yield call([authentication, "getIdTokenClaims"])).__raw;
  const response: Response = yield fetch(`${apiBaseUrl}/me`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + idToken,
    },
    body: JSON.stringify({ settings }),
  });
  const json = yield response.json();
  if (response.status > 399) {
    yield put(UserAction.userSetItemFailed(json));
  } else {
    yield put(UserAction.userSetItemSuccess(json));
  }
}

export function* watchUserActions() {
  yield takeEvery(UserActionTypes.USER_SET_ITEM, setItemSaga);
  yield takeEvery(UserActionTypes.USER_REMOVE_ITEM, removeItemSaga);
  const apiBaseUrl = yield getContext("apiBaseUrl");
  const authentication = yield getContext("authentication");
  let state = false;
  while (true) {
    const success = yield call(
      waitForCondition,
      // eslint-disable-next-line no-loop-func
      () =>
        state
          ? !authentication.isAuthenticated
          : authentication.isAuthenticated,
      -1 // Inifinite wait
    );
    if (success) {
      if (authentication.isAuthenticated) {
        const idToken = (yield call([authentication, "getIdTokenClaims"]))
          .__raw;
        const response: Response = yield fetch(`${apiBaseUrl}/me`, {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        });
        const user = yield response.json();
        yield put(UserAction.userAuthenticated(true, user));
        state = true;
      } else {
        yield put(UserAction.userAuthenticated(false, undefined));
        state = false;
      }
    }
  }
}
