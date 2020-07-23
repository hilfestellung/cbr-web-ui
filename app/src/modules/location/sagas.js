import { eventChannel } from 'redux-saga';
import { getContext, take, put, call } from 'redux-saga/effects';

import getLogger from '../../utils/logger';
import { LocationAction } from './actions';
import { waitForCondition } from '../../utils/sagas';

const logger = getLogger('location');

function isSameLocation(source, target) {
  const result =
    source &&
    target &&
    source.pathname === target.pathname &&
    source.search === target.search &&
    source.hash === target.hash;
  logger.trace('Is same', result, '-', source, target);
  return result;
}

function createHistoryChannel(history) {
  return eventChannel((emit) => {
    logger.debug('Setup history channel');
    const unlisten = history.listen((...event) => {
      logger.trace('Emit event', event);
      emit(event);
      logger.trace('Emitted event', event);
    });
    setTimeout(() => {
      emit([window.location, 'INIT']);
    }, 500);
    return () => {
      // Finally
      unlisten();
      logger.warn('History channel has ended.');
    };
  });
}

export function* watchLocation() {
  const router = yield getContext('router');
  yield call(waitForCondition, () => router.history != null, -1);
  const history = router.history;
  const historyChannel = createHistoryChannel(history);
  let persistLocation = {};
  while (true) {
    try {
      const event = yield take(historyChannel);
      logger.debug('Event', event);
      const [location, action] = event;
      if (!isSameLocation(location, persistLocation)) {
        yield put(LocationAction.locationChanged(action, location));
      }
      persistLocation = location;
    } catch (error) {
      logger.error('Error listening to history', error);
    }
  }
}
