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

export const selectServerConfig = createSelector(
	selectConfig,
	config => config.serverConfig
);

export const selectDevMode = createSelector(
	selectServerConfig,
	serverConfig => serverConfig.devMode
);
