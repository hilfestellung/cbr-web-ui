import { createSelector } from 'reselect';

import { BasicSelector } from '../basic';

const selectClasses = (state) => state.classes;

const isLoading = createSelector(selectClasses, (state) => state.isLoading);
const isSending = createSelector(selectClasses, (state) => state.isSending);
const getItems = createSelector(selectClasses, (state) => state.items);
const getError = createSelector(selectClasses, (state) => state.error);

const getQueryClass = createSelector(
  BasicSelector.getProject,
  getItems,
  (project, classes) => {
    return classes.find((modelClass) => modelClass.id === project.queryClass);
  }
);

export const ClassesSelector = {
  isLoading,
  isSending,
  getItems,
  getError,
  getQueryClass,
};
