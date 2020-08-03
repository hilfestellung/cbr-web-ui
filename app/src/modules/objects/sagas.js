import { takeEvery } from 'redux-saga/effects';

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

function* addObjectsSaga({ payload: { aggregateObject } }) {
  logger.debug('Adding object', aggregateObject);
  yield httpPostAuthenticated(
    `/aggregate`,
    aggregateObject,
    ObjectAction.addObjectSuccess,
    ObjectAction.addObjectFailed
  );
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

export function* watchObjectActions() {
  yield takeEvery(ObjectActionType.FETCH_OBJECTS, fetchObjectsSaga);
  yield takeEvery(ObjectActionType.ADD_OBJECT, addObjectsSaga);
  yield takeEvery(ObjectActionType.PUT_OBJECT, putObjectsSaga);
  yield takeEvery(ObjectActionType.REMOVE_OBJECT, removeObjectsSaga);
}
