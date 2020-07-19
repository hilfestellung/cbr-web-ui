import { BasicState } from "./reducer";
import { createSelector } from "reselect";

const selectBasic = (state: any) => state.basic as BasicState;

const isStarting = createSelector(selectBasic, (state) => state.isStarting);
const isStarted = createSelector(selectBasic, (state) => state.isStarted);
const getName = createSelector(selectBasic, (state) => state.name);
const getContact = createSelector(selectBasic, (state) => state.contact);
const getSettings = createSelector(selectBasic, (state) => state.settings);

export const BasicSelector = {
  isStarting,
  isStarted,
  getName,
  getContact,
  getSettings,
};
