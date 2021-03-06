import { handleActions } from 'redux-actions';
import { ObjectActionType } from './actions';

export const objectsReducer = handleActions(
  {
    [ObjectActionType.FETCH_OBJECTS]: (state) => ({
      ...state,
      error: undefined,
      isLoading: true,
    }),
    [ObjectActionType.FETCH_OBJECTS_SUCCESS]: (
      state,
      { payload: { items } }
    ) => ({ ...state, items, isLoading: false }),
    [ObjectActionType.FETCH_OBJECTS_FAILED]: (
      state,
      { payload: { error } }
    ) => ({ ...state, error, isLoading: false }),

    [ObjectActionType.ADD_OBJECT]: (state, { payload: { index = 0 } }) => ({
      ...state,
      isSending: true,
      error: null,
      added: index,
    }),
    [ObjectActionType.ADD_OBJECT_SUCCESS]: (
      state,
      { payload: { aggregateObject } }
    ) => ({
      ...state,
      items: [...state.items, aggregateObject],
      isSending: false,
    }),
    [ObjectActionType.ADD_OBJECT_FAILED]: (state, { payload: { error } }) => ({
      ...state,
      isSending: false,
      error: error,
    }),
    [ObjectActionType.ADD_OBJECTS]: (
      state,
      { payload: { aggregateObjects } }
    ) => ({
      ...state,
      isSending: true,
      error: null,
      added: 0,
      addCount: aggregateObjects.length,
    }),
    [ObjectActionType.ADD_OBJECTS_SUCCESS]: (state) => ({
      ...state,
      isSending: true,
      error: null,
      added: 0,
      addCount: 0,
    }),
    [ObjectActionType.ADD_OBJECTS_FAILED]: (state, { payload: { error } }) => ({
      ...state,
      isSending: true,
      error,
      added: 0,
      addCount: 0,
    }),

    [ObjectActionType.PUT_OBJECT]: (state) => ({
      ...state,
      isSending: true,
      error: null,
    }),
    [ObjectActionType.PUT_OBJECT_SUCCESS]: (
      state,
      { payload: { aggregateObject } }
    ) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === aggregateObject.id ? aggregateObject : item
      ),
      isSending: false,
    }),
    [ObjectActionType.PUT_OBJECT_FAILED]: (state, { payload: { error } }) => ({
      ...state,
      isSending: false,
      error: error,
    }),

    [ObjectActionType.REMOVE_OBJECT]: (state) => ({
      ...state,
      isSending: true,
      error: null,
    }),
    [ObjectActionType.REMOVE_OBJECT_SUCCESS]: (
      state,
      { payload: { aggregateObject } }
    ) => ({
      ...state,
      items: state.items.filter((item) => item.id !== aggregateObject.id),
      isSending: false,
    }),
    [ObjectActionType.REMOVE_OBJECT_FAILED]: (
      state,
      { payload: { error } }
    ) => ({
      ...state,
      isSending: false,
      error: error,
    }),

    [ObjectActionType.REMOVE_ALL_OBJECTS]: (state) => ({
      ...state,
      isSending: true,
      error: null,
    }),
    [ObjectActionType.REMOVE_ALL_OBJECTS_SUCCESS]: (state) => ({
      ...state,
      items: [],
      isSending: false,
    }),
    [ObjectActionType.REMOVE_ALL_OBJECTS_FAILED]: (
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
