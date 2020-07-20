import { takeEvery, getContext, put, call } from "redux-saga/effects";

import { ClassesAction, ClassesActionType } from "./actions";
import getLogger from "../../utils/logger";
import { waitForCondition } from "../../utils/sagas";

const logger = getLogger("classes");

function* fetchClassesSaga() {
  try {
    logger.debug("Fetching classes");
    const apiBaseUrl = yield getContext("apiBaseUrl");
    const authentication = yield getContext("authentication");

    if (!authentication.isAuthenticated) {
      logger.debug(
        "Application not authenticated. Postpone search until application is authenticated."
      );
      const success = yield call(
        waitForCondition,
        () => authentication.isAuthenticated,
        -1 // Inifinite wait
      );
      if (!success) {
        yield put(
          ClassesAction.fetchClassesFailed(
            new Error("Application is not authenticated")
          )
        );
        return;
      }
    }
    logger.debug("Fetching classes now");
    const idToken = (yield call([authentication, "getIdTokenClaims"])).__raw;
    const response: Response = yield fetch(`${apiBaseUrl}/class`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + idToken,
      },
    });
    const json = yield response.json();
    if (response.status > 399) {
      yield put(ClassesAction.fetchClassesFailed(json));
    } else {
      yield put(ClassesAction.fetchClassesSuccess(json));
    }
  } catch (err) {
    logger.error("Failed fetching classes", err);
    yield put(ClassesAction.fetchClassesFailed(err));
  }
}

export function* watchClassesActions() {
  yield takeEvery(ClassesActionType.FETCH_CLASSES, fetchClassesSaga);
}
