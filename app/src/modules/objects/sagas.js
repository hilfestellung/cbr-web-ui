import { takeEvery, take, put } from 'redux-saga/effects';

import { ObjectAction, ObjectActionType } from './actions';
import getLogger from '../../utils/logger';
import {
  httpGetAuthenticated,
  httpPostAuthenticated,
  httpPutAuthenticated,
  httpDeleteAuthenticated,
} from '../../utils/sagas';

const logger = getLogger('objects');

function* fetchObjectsSaga() {
  logger.debug('Fetching objects');
  yield httpGetAuthenticated(
    '/aggregate',
    ObjectAction.fetchObjectsSuccess,
    ObjectAction.fetchObjectsFailed
  );
}

function* addObjectSaga({ payload: { aggregateObject } }) {
  logger.debug('Adding object', aggregateObject);
  yield httpPostAuthenticated(
    `/aggregate`,
    aggregateObject,
    ObjectAction.addObjectSuccess,
    ObjectAction.addObjectFailed
  );
}

function* addObjectsSaga({ payload: { aggregateObjects } }) {
  try {
    for (let i = 0, n = aggregateObjects.length; i < n; i++) {
      yield put(ObjectAction.addObject(aggregateObjects[i], i));
      yield take([
        ObjectActionType.ADD_OBJECT_SUCCESS,
        ObjectActionType.ADD_OBJECT_FAILED,
      ]);
    }
  } catch (err) {
    logger.error('Failed adding objects', err);
  } finally {
    yield put(ObjectAction.addObjectsSuccess());
  }
}

function* putObjectsSaga({ payload: { aggregateObject } }) {
  logger.debug('Putting object', aggregateObject);
  yield httpPutAuthenticated(
    `/aggregate/${aggregateObject.id}`,
    aggregateObject,
    ObjectAction.putObjectSuccess,
    ObjectAction.putObjectFailed
  );
}

function* removeObjectsSaga({ payload: { id } }) {
  logger.debug('Putting object', id);
  yield httpDeleteAuthenticated(
    `/aggregate/${id}`,
    ObjectAction.removeObjectSuccess,
    ObjectAction.removeObjectFailed
  );
}

function* removeAllObjectsSaga() {
  logger.debug('Deleting all objects');
  yield httpDeleteAuthenticated(
    `/aggregate`,
    ObjectAction.removeAllObjectsSuccess,
    ObjectAction.removeAllObjectsFailed
  );
}

export function* watchObjectActions() {
  yield takeEvery(ObjectActionType.FETCH_OBJECTS, fetchObjectsSaga);
  yield takeEvery(ObjectActionType.ADD_OBJECT, addObjectSaga);
  yield takeEvery(ObjectActionType.ADD_OBJECTS, addObjectsSaga);
  yield takeEvery(ObjectActionType.PUT_OBJECT, putObjectsSaga);
  yield takeEvery(ObjectActionType.REMOVE_OBJECT, removeObjectsSaga);
  yield takeEvery(ObjectActionType.REMOVE_ALL_OBJECTS, removeAllObjectsSaga);
}
