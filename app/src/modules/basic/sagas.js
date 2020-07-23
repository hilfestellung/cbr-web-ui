import { getContext, put, takeEvery } from 'redux-saga/effects';
import { BasicActions, BasicActionTypes } from './actions';
import getLogger from '../../utils/logger';

const logger = getLogger('basic');

function* startupSaga() {
  try {
    logger.debug('Application startup');
    const apiBaseUrl = yield getContext('apiBaseUrl');
    logger.trace('Fetching tenant data');
    const response = yield fetch(`${apiBaseUrl}/`);
    logger.trace('Fetched tenant data');
    logger.trace('Parsing JSON');
    const json = yield response.json();
    logger.trace('Parsed JSON');
    if (response > 399) {
      logger.error('Server error', json);
      yield put(BasicActions.startupFailed(json));
    } else {
      logger.trace('Tenant data success', json);
      yield put(BasicActions.startupSuccess(json));
    }
  } catch (err) {
    logger.error('Error starting up', err);
    yield put(BasicActions.startupFailed(err));
  }
  logger.debug('Application is started up');
}

export function* watchBasicActions() {
  yield takeEvery(BasicActionTypes.STARTUP, startupSaga);
}
