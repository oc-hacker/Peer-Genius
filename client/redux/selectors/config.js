import { createSelector } from 'reselect';

export const selectConfig = state => state.config;

export const selectCommunicationMethods = createSelector(
  selectConfig,
  config => config.communicationMethods
);

export const selectCourses = createSelector(
  selectConfig,
  config => config.courses
);

export const selectServerConfig = createSelector(
  selectConfig,
  config => config.serverConfig
);

export const selectDevMode = createSelector(
  selectServerConfig,
  serverConfig => serverConfig.devMode
);
