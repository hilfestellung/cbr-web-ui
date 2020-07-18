import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaRuntime from "redux-saga";
import { all, spawn } from "redux-saga/effects";

import { composeWithDevTools } from "redux-devtools-extension";

import getLogger from "./utils/logger";

import globals from "./globals";
import { watchSearchActions } from "./modules/search";
import { Auth0ContextInterface } from "@auth0/auth0-react";
import { watchLocation } from "./modules/location";

const { isProduction } = globals;

const logger = getLogger("redux");

export interface SagaContext {
  authentication: Auth0ContextInterface;
}

export default function (context: any) {
  logger.debug("Setup redux store");
  const sagaRuntime = createSagaRuntime({
    context,
  });

  const initialState = {};
  const reducers = {
    app: (state = {}) => state,
  };
  const sagas: any[] = [watchLocation, watchSearchActions];
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
