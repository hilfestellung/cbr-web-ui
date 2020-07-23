import { takeEvery, delay } from 'redux-saga/effects';

import { ClassesAction, ClassesActionType } from './actions';
import getLogger from '../../utils/logger';
import { httpGetAuthenticated, httpPutAuthenticated } from '../../utils/sagas';

const logger = getLogger('classes');

function* fetchClassesSaga() {
  logger.debug('Fetching classes');
  yield httpGetAuthenticated(
    '/class',
    ClassesAction.fetchClassesSuccess,
    ClassesAction.fetchClassesFailed
  );
}

function* putClassesSaga({ payload: { modelClass } }) {
  logger.debug('Putting class', modelClass);
  yield delay(10);
  yield httpPutAuthenticated(
    `/class/${modelClass.id}`,
    modelClass,
    ClassesAction.putClassSuccess,
    ClassesAction.putClassFailed
  );
}

export function* watchClassesActions() {
  yield takeEvery(ClassesActionType.FETCH_CLASSES, fetchClassesSaga);
  yield takeEvery(ClassesActionType.PUT_CLASS, putClassesSaga);
}
