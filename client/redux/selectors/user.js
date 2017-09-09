import { createSelector } from 'reselect';

export const selectUser = state => state.user;

export const selectUserId = createSelector(
  selectUser,
  user => user.id
);
