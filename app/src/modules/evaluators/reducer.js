import { handleActions } from 'redux-actions';
import { EvaluatorActionType } from './actions';

export const evaluatorsReducer = handleActions(
  {
    [EvaluatorActionType.FETCH_EVALUATORS]: (state) => ({
      ...state,
      error: undefined,
      isLoading: true,
    }),
    [EvaluatorActionType.FETCH_EVALUATORS_SUCCESS]: (
      state,
      { payload: { items } }
    ) => ({ ...state, items, isLoading: false }),
    [EvaluatorActionType.FETCH_EVALUATORS_FAILED]: (
      state,
      { payload: { error } }
    ) => ({ ...state, error, isLoading: false }),

    [EvaluatorActionType.ADD_EVALUATOR]: (state) => ({
      ...state,
      isSending: true,
      error: null,
    }),
    [EvaluatorActionType.ADD_EVALUATOR_SUCCESS]: (
      state,
      { payload: { evaluator } }
    ) => ({
      ...state,
      items: [...state.items, evaluator],
      isSending: false,
    }),
    [EvaluatorActionType.ADD_EVALUATOR_FAILED]: (
      state,
      { payload: { error } }
    ) => ({
      ...state,
      isSending: false,
      error: error,
    }),

    [EvaluatorActionType.PUT_EVALUATOR]: (state) => ({
      ...state,
      isSending: true,
      error: null,
    }),
    [EvaluatorActionType.PUT_EVALUATOR_SUCCESS]: (
      state,
      { payload: { evaluator } }
    ) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === evaluator.id ? evaluator : item
      ),
      isSending: false,
    }),
    [EvaluatorActionType.PUT_EVALUATOR_FAILED]: (
      state,
      { payload: { error } }
    ) => ({
      ...state,
      isSending: false,
      error: error,
    }),

    [EvaluatorActionType.REMOVE_ADD_EVALUATOR]: (state) => ({
      ...state,
      isSending: true,
      error: null,
    }),
    [EvaluatorActionType.REMOVE_ADD_EVALUATOR_SUCCESS]: (
      state,
      { payload: { evaluator } }
    ) => ({
      ...state,
      items: state.items.filter((item) => item.id !== evaluator.id),
      isSending: false,
    }),
    [EvaluatorActionType.REMOVE_ADD_EVALUATOR_FAILED]: (
      state,
      { payload: { error } }
    ) => ({
      ...state,
      isSending: false,
      error: error,
    }),
  },
  {
    isLoading: false,
    isSending: false,
    items: [],
    error: undefined,
  }
);
