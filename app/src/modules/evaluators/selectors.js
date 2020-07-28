import { createSelector } from 'reselect';

const selectEvaluators = (state) => state.evaluators;

const isLoading = createSelector(selectEvaluators, (state) => state.isLoading);
const isSending = createSelector(selectEvaluators, (state) => state.isSending);
const getItems = createSelector(selectEvaluators, (state) => state.items);
const getError = createSelector(selectEvaluators, (state) => state.error);

export const EvaluatorsSelector = {
  isLoading,
  isSending,
  getItems,
  getError,
};
