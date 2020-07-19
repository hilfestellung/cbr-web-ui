import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaRuntime from "redux-saga";
import { all, spawn } from "redux-saga/effects";
import { composeWithDevTools } from "redux-devtools-extension";

import { Auth0ContextInterface } from "@auth0/auth0-react";

import getLogger from "./utils/logger";

import globals from "./globals";
import { watchBasicActions, basicReducer, BasicActions } from "./modules/basic";
import { watchLocation, locationReducer } from "./modules/location";
import { watchSearchActions, searchReducer } from "./modules/search";
import { watchUserActions, userReducer } from "./modules/user";

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

  // Initial state
  const initialState = {};

  // Reducer definition
  const reducers = {
    app: (state = {}) => state,
    basic: basicReducer,
    user: userReducer,
    search: searchReducer,
    location: locationReducer,
  };

  // Saga definition
  const sagas: any[] = [
    watchBasicActions,
    watchUserActions,
    watchLocation,
    watchSearchActions,
  ];

  // Middleware definition
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
  logger.debug("Redux store is set up. Dispatching application startup");
  store.dispatch(BasicActions.startup());
  return store;
}
