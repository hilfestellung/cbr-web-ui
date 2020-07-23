import { eventChannel } from 'redux-saga';
import { take, race, delay } from 'redux-saga/effects';
import getLogger from './logger';

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
