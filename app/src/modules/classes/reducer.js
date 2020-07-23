import { handleActions } from 'redux-actions';
import { ClassesActionType } from './actions';

export const classesReducer = handleActions(
  {
    [ClassesActionType.FETCH_CLASSES]: (state) => ({
      ...state,
      error: undefined,
      isLoading: true,
    }),
    [ClassesActionType.FETCH_CLASSES_SUCCESS]: (
      state,
      { payload: { items } }
    ) => ({ ...state, items, isLoading: false }),
    [ClassesActionType.FETCH_CLASSES_FAILED]: (
      state,
      { payload: { error } }
    ) => ({ ...state, error, isLoading: false }),
    [ClassesActionType.PUT_CLASS]: (state) => ({
      ...state,
      isSending: true,
      error: null,
    }),
    [ClassesActionType.PUT_CLASS_SUCCESS]: (
      state,
      { payload: { modelClass } }
    ) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === modelClass.id ? modelClass : item
      ),
      isSending: false,
    }),
    [ClassesActionType.PUT_CLASS_FAILED]: (state, { payload: { error } }) => ({
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
