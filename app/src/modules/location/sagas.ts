import { eventChannel, EventChannel } from "redux-saga";
import { getContext, take, put } from "redux-saga/effects";
import { History, Location } from "history";

import getLogger from "../../utils/logger";
import { LocationAction } from "./actions";

const logger = getLogger("location");

function isSameLocation(source: Location, target: Location) {
  const result =
    source &&
    target &&
    source.pathname === target.pathname &&
    source.search === target.search &&
    source.hash === target.hash;
  logger.trace("Is same", result, "-", source, target);
  return result;
}

function createHistoryChannel(history: History): EventChannel<unknown> {
  return eventChannel((emit) => {
    logger.debug("Setup history channel");
    const unlisten = history.listen((...event: any[]) => {
      logger.trace("Emit event", event);
      emit(event);
      logger.trace("Emitted event", event);
    });
    setTimeout(() => {
      emit([window.location, "INIT"]);
    }, 500);
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
  let persistLocation: Location = {} as Location<History.PoorMansUnknown>;
  while (true) {
    try {
      const event = yield take(historyChannel);
      logger.debug("Event", event);
      const [location, action] = event;
      if (!isSameLocation(location, persistLocation)) {
        yield put(LocationAction.locationChanged(action, location));
      }
      persistLocation = location;
    } catch (error) {
      logger.error("Error listening to history", error);
    }
  }
}
