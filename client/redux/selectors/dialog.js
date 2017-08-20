import { createSelector } from 'reselect';

export const selectDialog = state => state.dialog;

export const selectShowUnexpectedErrorDialog = createSelector(
	selectDialog,
	dialog => dialog.unexpectedError && !dialog.ignoreUnexpectedError
);