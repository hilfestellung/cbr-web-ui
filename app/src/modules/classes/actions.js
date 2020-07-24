import { createAction } from 'redux-actions';

const FETCH_CLASSES = '[Classes] Fetch classes';
const FETCH_CLASSES_SUCCESS = '[Classes] Fetch classes success';
const FETCH_CLASSES_FAILED = '[Classes] Fetch classes failed';

const ADD_CLASS = '[Classes] Add class';
const ADD_CLASS_SUCCESS = '[Classes] Add class success';
const ADD_CLASS_FAILED = '[Classes] Add class failed';

const PUT_CLASS = '[Classes] Put class';
const PUT_CLASS_SUCCESS = '[Classes] Put class success';
const PUT_CLASS_FAILED = '[Classes] Put class failed';

const REMOVE_CLASS = '[Classes] Remove class';
const REMOVE_CLASS_SUCCESS = '[Classes] Remove class success';
const REMOVE_CLASS_FAILED = '[Classes] Remove class failed';

const fetchClasses = createAction(FETCH_CLASSES);
const fetchClassesSuccess = createAction(FETCH_CLASSES_SUCCESS, (items) => ({
  items,
}));
const fetchClassesFailed = createAction(FETCH_CLASSES_FAILED, (error) => ({
  error: error,
}));

const addClass = createAction(ADD_CLASS, (modelClass) => ({ modelClass }));
const addClassSuccess = createAction(ADD_CLASS_SUCCESS, (modelClass) => ({
  modelClass,
}));
const addClassFailed = createAction(ADD_CLASS_FAILED, (error) => ({ error }));

const putClass = createAction(PUT_CLASS, (modelClass) => ({ modelClass }));
const putClassSuccess = createAction(PUT_CLASS_SUCCESS, (modelClass) => ({
  modelClass,
}));
const putClassFailed = createAction(PUT_CLASS_FAILED, (error) => ({ error }));

const removeClass = createAction(REMOVE_CLASS, (id) => ({
  id,
}));
const removeClassSuccess = createAction(REMOVE_CLASS_SUCCESS, (modelClass) => ({
  modelClass,
}));
const removeClassFailed = createAction(REMOVE_CLASS_FAILED, (error) => ({
  error,
}));

export const ClassesAction = {
  fetchClasses,
  fetchClassesSuccess,
  fetchClassesFailed,
  addClass,
  addClassSuccess,
  addClassFailed,
  putClass,
  putClassSuccess,
  putClassFailed,
  removeClass,
  removeClassSuccess,
  removeClassFailed,
};

export const ClassesActionType = {
  FETCH_CLASSES,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILED,
  ADD_CLASS,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILED,
  PUT_CLASS,
  PUT_CLASS_SUCCESS,
  PUT_CLASS_FAILED,
  REMOVE_CLASS,
  REMOVE_CLASS_SUCCESS,
  REMOVE_CLASS_FAILED,
};
