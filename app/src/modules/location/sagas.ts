import { eventChannel, EventChannel } from "redux-saga";
import { getContext, take, put } from "redux-saga/effects";
import { History } from "history";

import getLogger from "../../utils/logger";
import { LocationAction } from "./actions";

const logger = getLogger("location");

function createHistoryChannel(history: History): EventChannel<unknown> {
  return eventChannel((emit) => {
    logger.debug("Setup history channel");
    const unlisten = history.listen((...event: any[]) => {
      logger.trace("Emit event", event);
      emit(event);
      logger.trace("Emitted event", event);
    });
    setTimeout(() => {
      emit([history.location, "PUSH"]);
    }, 0);
    return () => {
      // Finally
      unlisten();
      logger.warn("History channel has ended.");
    };
  });
}

export function* watchLocation() {
  const history: History = yield getContext("history");
  const historyChannel = createHistoryChannel(history);
  while (true) {
    try {
      const event = yield take(historyChannel);
      logger.debug("Event", event);
      const [location, action] = event;
      yield put(LocationAction.locationChanged(action, location));
    } catch (error) {
      logger.error("Error listening to history", error);
    }
  }
}
