import { handleActions } from "redux-actions";
import { ClassesActionType } from "./actions";

export interface ClassesState {
  isLoading: boolean;
  items: any[];
  error: any;
}

export const classesReducer = handleActions<ClassesState>(
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
  },
  {
    isLoading: false,
    items: [],
    error: undefined,
  }
);
