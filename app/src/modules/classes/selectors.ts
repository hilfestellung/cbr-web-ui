import { ClassesState } from "./reducer";
import { createSelector } from "reselect";

const selectClasses = (state: any) => state.classes as ClassesState;

const isLoading = createSelector(selectClasses, (state) => state.isLoading);
const getItems = createSelector(selectClasses, (state) => state.items);
const getError = createSelector(selectClasses, (state) => state.error);

export const ClassesSelector = {
  isLoading,
  getItems,
  getError,
};
