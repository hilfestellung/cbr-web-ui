import { eventChannel } from 'redux-saga';
import { take, race, delay, getContext, call, put } from 'redux-saga/effects';
import getLogger from './logger';
import { HttpError } from './errors';

const logger = getLogger('redux-saga-utils');

export function* waitForCondition(
  condition,
  timeout = 10000,
  checkInterval = 10
) {
  let result = false;
  let waitChannel = null;
  try {
    logger.debug('WaitFor - starts');
    waitChannel = eventChannel((emit) => {
      const handle = setInterval(() => {
        if (condition()) {
          emit('success');
        }
      }, checkInterval || 10);
      logger.trace('WaitFor - channel initialized');
      return () => {
        // Finally
        clearInterval(handle);
        logger.trace('WaitFor - channel destroyed');
      };
    });
    logger.trace('WaitFor - wait for channel');
    if (timeout > 0) {
      const { success } = yield race({
        success: take(waitChannel),
        _: delay(timeout),
      });
      result = !!success;
    } else {
      result = (yield take(waitChannel)) === 'success';
    }
  } catch (err) {
    logger.error('WaitFor - error calculating condition', err);
  } finally {
    if (waitChannel != null) {
      try {
        waitChannel.close();
      } catch (err) {
        logger.error('WaitFor - error closing wait channel');
      }
    }
    logger.trace('WaitFor - done');
  }
  logger.debug('WaitFor - result success:', result);
  return result;
}

export function* httpGetAuthenticated(
  url,
  successAction,
  failedAction,
  requestConfig = {}
) {
  yield httpRequestAuthenticated(
    'GET',
    url,
    undefined,
    successAction,
    failedAction,
    requestConfig
  );
}

export function* httpPutAuthenticated(
  url,
  data,
  successAction,
  failedAction,
  requestConfig = {}
) {
  yield httpRequestAuthenticated(
    'PUT',
    url,
    data,
    successAction,
    failedAction,
    requestConfig
  );
}

function* httpRequestAuthenticated(
  method,
  url,
  data,
  successAction,
  failedAction,
  requestConfig = {}
) {
  try {
    const apiBaseUrl = yield getContext('apiBaseUrl');
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
        new HttpError(401, 'Unauthorized', 'Application is not authorized');
        return;
      }
    }
    logger.trace('Processing request now');
    const idToken = (yield call([authentication, 'getIdTokenClaims'])).__raw;
    const { response } = yield race({
      response: fetch(`${apiBaseUrl}${url}`, {
        ...requestConfig,
        method,
        headers: {
          ...requestConfig.headers,
          Authorization: 'Bearer ' + idToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      timeout: delay(5000),
    });
    logger.trace('Request is processed.');
    if (response) {
      const json = yield response.json();
      if (response.status < 200 || response.status > 299) {
        throw new HttpError(response.status);
      } else {
        logger.trace(`Request "${method} ${url}" was successful:`, json);
        yield put(successAction(json));
      }
    } else {
      throw new HttpError(504, 'RequestTimeout', 'Timed out');
    }
  } catch (error) {
    logger.error(`Request "${method} ${url}" failed`, error);
    if (error instanceof HttpError) {
      yield put(
        failedAction({
          status: error.status,
          code: error.code,
          message: error.message,
          stack: error.stack,
        })
      );
    } else {
      yield put(
        failedAction({
          status: 500,
          code: 'UnexpectedError',
          message: error.message,
          stack: error.stack,
        })
      );
    }
  }
}
