import { createAction } from 'redux-actions';

const FETCH_CLASSES = '[Classes] Fetch classes';
const FETCH_CLASSES_SUCCESS = '[Classes] Fetch classes success';
const FETCH_CLASSES_FAILED = '[Classes] Fetch classes failed';

const PUT_CLASS = '[Classes] Put class';
const PUT_CLASS_SUCCESS = '[Classes] Put class success';
const PUT_CLASS_FAILED = '[Classes] Put class failed';

const fetchClasses = createAction(FETCH_CLASSES);
const fetchClassesSuccess = createAction(FETCH_CLASSES_SUCCESS, (items) => ({
  items,
}));
const fetchClassesFailed = createAction(FETCH_CLASSES_FAILED, (error) => ({
  error: error,
}));

const putClass = createAction(PUT_CLASS, (modelClass) => ({ modelClass }));
const putClassSuccess = createAction(PUT_CLASS_SUCCESS, (modelClass) => ({
  modelClass,
}));
const putClassFailed = createAction(PUT_CLASS_FAILED, (error) => ({ error }));

export const ClassesAction = {
  fetchClasses,
  fetchClassesSuccess,
  fetchClassesFailed,
  putClass,
  putClassSuccess,
  putClassFailed,
};

export const ClassesActionType = {
  FETCH_CLASSES,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILED,
  PUT_CLASS,
  PUT_CLASS_SUCCESS,
  PUT_CLASS_FAILED,
};
