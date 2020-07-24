import { takeEvery } from 'redux-saga/effects';

import { ClassesAction, ClassesActionType } from './actions';
import getLogger from '../../utils/logger';
import {
  httpGetAuthenticated,
  httpPostAuthenticated,
  httpPutAuthenticated,
  httpDeleteAuthenticated,
} from '../../utils/sagas';

const logger = getLogger('classes');

function* fetchClassesSaga() {
  logger.debug('Fetching classes');
  yield httpGetAuthenticated(
    '/class',
    ClassesAction.fetchClassesSuccess,
    ClassesAction.fetchClassesFailed
  );
}

function* addClassesSaga({ payload: { modelClass } }) {
  logger.debug('Adding class', modelClass);
  yield httpPostAuthenticated(
    `/class`,
    modelClass,
    ClassesAction.addClassSuccess,
    ClassesAction.addClassFailed
  );
}

function* putClassesSaga({ payload: { modelClass } }) {
  logger.debug('Putting class', modelClass);
  yield httpPutAuthenticated(
    `/class/${modelClass.id}`,
    modelClass,
    ClassesAction.putClassSuccess,
    ClassesAction.putClassFailed
  );
}

function* removeClassesSaga({ payload: { id } }) {
  logger.debug('Putting class', id);
  yield httpDeleteAuthenticated(
    `/class/${id}`,
    ClassesAction.removeClassSuccess,
    ClassesAction.removeClassFailed
  );
}

export function* watchClassesActions() {
  yield takeEvery(ClassesActionType.FETCH_CLASSES, fetchClassesSaga);
  yield takeEvery(ClassesActionType.ADD_CLASS, addClassesSaga);
  yield takeEvery(ClassesActionType.PUT_CLASS, putClassesSaga);
  yield takeEvery(ClassesActionType.REMOVE_CLASS, removeClassesSaga);
}
