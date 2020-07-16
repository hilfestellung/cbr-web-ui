import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaRuntime from "redux-saga";
import { all, spawn } from "redux-saga/effects";

import { composeWithDevTools } from "redux-devtools-extension";

import getLogger from "./utils/logger";

const logger = getLogger("redux");

export default function () {
  logger.debug("Setup redux store");
  const sagaRuntime = createSagaRuntime({
    context: {},
  });

  const initialState = {};

  const reducers = {
    app: (state = {}) => state,
  };
  const sagas: any[] = [];
  const middleware = applyMiddleware(...[sagaRuntime]);

  logger.debug("Create redux store");
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(middleware)
  );
  logger.debug("Redux store created");

  // Fire up middlewares
  logger.debug("Fire up sagas");
  sagaRuntime.run(function* () {
    yield all(sagas.map((saga) => spawn(saga)));
  });
  logger.debug("Sagas are fired up");
  return store;
}
