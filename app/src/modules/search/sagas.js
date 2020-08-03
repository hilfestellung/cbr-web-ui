import { takeEvery, getContext, call, put, select } from 'redux-saga/effects';
import getLogger from '../../utils/logger';
import { waitForCondition } from '../../utils/sagas';
import { LocationUtils } from '../location/utils';

import { SearchAction } from './actions';
import { SearchSelector } from './selectors';

const logger = getLogger('search');

function* searchSaga({ payload: { location } }) {
  if (yield select(SearchSelector.isSearching)) {
    logger.warn('Already searching, ignoring request');
    return;
  }
  try {
    logger.trace('Entering search');
    const authentication = yield getContext('authentication');

    if (!authentication.isAuthenticated) {
      logger.debug(
        'Application not authenticated. Postpone search until application is authenticated.'
      );
      const success = yield call(
        waitForCondition,
        () => authentication.isAuthenticated,
        -1 // Inifinite wait
      );
      if (!success) {
        yield put(
          SearchAction.searchFailed(
            new Error('Application is not authenticated')
          )
        );
        return;
      }
    }
    const apiBaseUrl = yield getContext('apiBaseUrl');
    const query = Object.fromEntries(new URLSearchParams(location.search));
    logger.debug('Start new search', query);

    logger.trace('Requesting ID token');
    const idToken = (yield call([authentication, 'getIdTokenClaims'])).__raw;
    logger.trace('Search using id token');
    const response = yield fetch(`${apiBaseUrl}/evaluate`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + idToken,
      },
      body: JSON.stringify(query),
    });
    logger.trace('Search is done. Parse response.');
    const json = yield response.json();
    logger.trace('Response is parsed');
    if (response.status > 399) {
      logger.error('Search response is errornous', json);
      yield put(SearchAction.searchFailed(json));
    } else {
      logger.debug('Search response data', json);
      yield put(SearchAction.searchSuccess(json));
    }
  } catch (err) {
    logger.error('Error while executing search', err);
    yield put(SearchAction.searchFailed(err));
  } finally {
    logger.trace('Search is done');
  }
}

export function* watchSearchActions() {
  logger.debug('Setup search action watcher');
  const searchConfig = yield getContext('searchConfig');
  const { path, pattern } = searchConfig.location || {};
  yield takeEvery(
    LocationUtils.createSagaTakePattern({ path, pattern }),
    searchSaga
  );
  yield takeEvery(SearchAction.search, searchSaga);

  logger.debug('Setup search action watcher - done.');
}
