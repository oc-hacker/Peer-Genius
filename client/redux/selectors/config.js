import { createSelector } from 'reselect';

export const selectConfig = state => state.config;

export const selectCommunicationMethods = createSelector(
	selectConfig,
	config => config.communicationMethods
);

export const selectSubjects = createSelector(
	selectConfig,
	config => config.subjects
);
