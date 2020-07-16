import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaRuntime from "redux-saga";
import { all, spawn } from "redux-saga/effects";

import { composeWithDevTools } from "redux-devtools-extension";

import getLogger from "./utils/logger";

import globals from "./globals";

const { isProduction } = globals;

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

  logger.trace("Create redux store");
  const store = createStore(
    combineReducers(reducers),
    initialState,
    isProduction ? compose(middleware) : composeWithDevTools(middleware)
  );
  logger.trace("Redux store created");

  // Fire up middlewares
  logger.trace("Fire up sagas");
  sagaRuntime.run(function* () {
    yield all(sagas.map((saga) => spawn(saga)));
  });
  logger.debug("Redux store is set up   ");
  return store;
}
