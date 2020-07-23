import { createAction } from 'redux-actions';

const FETCH_CLASSES = '[Classes] Fetch classes';
const FETCH_CLASSES_SUCCESS = '[Classes] Fetch classes success';
const FETCH_CLASSES_FAILED = '[Classes] Fetch classes failed';

const fetchClasses = createAction(FETCH_CLASSES);
const fetchClassesSuccess = createAction(FETCH_CLASSES_SUCCESS, (items) => ({
  items,
}));
const fetchClassesFailed = createAction(FETCH_CLASSES_FAILED, (error) => ({
  error,
}));

export const ClassesAction = {
  fetchClasses,
  fetchClassesSuccess,
  fetchClassesFailed,
};

export const ClassesActionType = {
  FETCH_CLASSES,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILED,
};
