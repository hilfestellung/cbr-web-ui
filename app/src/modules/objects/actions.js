import { createAction } from 'redux-actions';

const FETCH_OBJECTS = '[Objects] Fetch objects';
const FETCH_OBJECTS_SUCCESS = '[Objects] Fetch objects success';
const FETCH_OBJECTS_FAILED = '[Objects] Fetch objects failed';

const ADD_OBJECT = '[Objects] Add object';
const ADD_OBJECT_SUCCESS = '[Objects] Add object success';
const ADD_OBJECT_FAILED = '[Objects] Add object failed';

const PUT_OBJECT = '[Objects] Put object';
const PUT_OBJECT_SUCCESS = '[Objects] Put object success';
const PUT_OBJECT_FAILED = '[Objects] Put object failed';

const REMOVE_OBJECT = '[Objects] Remove object';
const REMOVE_OBJECT_SUCCESS = '[Objects] Remove object success';
const REMOVE_OBJECT_FAILED = '[Objects] Remove object failed';

const REMOVE_ALL_OBJECTS = '[Objects] Remove all objects';
const REMOVE_ALL_OBJECTS_SUCCESS = '[Objects] Remove all objects success';
const REMOVE_ALL_OBJECTS_FAILED = '[Objects] Remove all objects failed';

const fetchObjects = createAction(FETCH_OBJECTS);
const fetchObjectsSuccess = createAction(FETCH_OBJECTS_SUCCESS, (items) => ({
  items,
}));
const fetchObjectsFailed = createAction(FETCH_OBJECTS_FAILED, (error) => ({
  error: error,
}));

const addObject = createAction(ADD_OBJECT, (aggregateObject) => ({
  aggregateObject,
}));
const addObjectSuccess = createAction(
  ADD_OBJECT_SUCCESS,
  (aggregateObject) => ({
    aggregateObject,
  })
);
const addObjectFailed = createAction(ADD_OBJECT_FAILED, (error) => ({ error }));

const putObject = createAction(PUT_OBJECT, (aggregateObject) => ({
  aggregateObject,
}));
const putObjectSuccess = createAction(
  PUT_OBJECT_SUCCESS,
  (aggregateObject) => ({
    aggregateObject,
  })
);
const putObjectFailed = createAction(PUT_OBJECT_FAILED, (error) => ({ error }));

const removeObject = createAction(REMOVE_OBJECT, (id) => ({
  id,
}));
const removeObjectSuccess = createAction(
  REMOVE_OBJECT_SUCCESS,
  (aggregateObject) => ({
    aggregateObject,
  })
);
const removeObjectFailed = createAction(REMOVE_OBJECT_FAILED, (error) => ({
  error,
}));

const removeAllObjects = createAction(REMOVE_ALL_OBJECTS);
const removeAllObjectsSuccess = createAction(REMOVE_ALL_OBJECTS_SUCCESS);
const removeAllObjectsFailed = createAction(
  REMOVE_ALL_OBJECTS_FAILED,
  (error) => ({
    error,
  })
);

export const ObjectAction = {
  fetchObjects,
  fetchObjectsSuccess,
  fetchObjectsFailed,
  addObject,
  addObjectSuccess,
  addObjectFailed,
  putObject,
  putObjectSuccess,
  putObjectFailed,
  removeObject,
  removeObjectSuccess,
  removeObjectFailed,
  removeAllObjects,
  removeAllObjectsSuccess,
  removeAllObjectsFailed,
};

export const ObjectActionType = {
  FETCH_OBJECTS,
  FETCH_OBJECTS_SUCCESS,
  FETCH_OBJECTS_FAILED,
  ADD_OBJECT,
  ADD_OBJECT_SUCCESS,
  ADD_OBJECT_FAILED,
  PUT_OBJECT,
  PUT_OBJECT_SUCCESS,
  PUT_OBJECT_FAILED,
  REMOVE_OBJECT,
  REMOVE_OBJECT_SUCCESS,
  REMOVE_OBJECT_FAILED,
  REMOVE_ALL_OBJECTS,
  REMOVE_ALL_OBJECTS_SUCCESS,
  REMOVE_ALL_OBJECTS_FAILED,
};
