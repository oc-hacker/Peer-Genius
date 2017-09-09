import { createSelector } from 'reselect';

export const selectStatus = state => state.status;

export const selectInitStatus = createSelector(
  selectStatus,
  status => status.init
);
