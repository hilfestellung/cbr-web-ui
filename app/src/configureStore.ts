import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaRuntime from "redux-saga";
import { all, spawn } from "redux-saga/effects";

import { composeWithDevTools } from "redux-devtools-extension";

export default function () {
  const sagaRuntime = createSagaRuntime({
    context: {},
  });

  const initialState = {};

  const reducers = {};
  const sagas: any[] = [];
  const middleware = applyMiddleware(...[sagaRuntime]);

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(middleware)
  );

  // Fire up middlewares
  sagaRuntime.run(function* () {
    yield all(sagas.map((saga) => spawn(saga)));
  });
  return store;
}
