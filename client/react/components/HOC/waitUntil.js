import React, { Component } from 'react';

import { CircularProgress } from 'material-ui/Progress';

import Flex from '../Flex';

import displayName from './displayName';

const waitUntil = condition => Component => {
  const DecoratedComponent = props => {
    if (!condition(props)) {
      return (
        <Flex align="center" justify="center">
          <CircularProgress />
        </Flex>
      );
    }
    else {
      return (
        <Component {...props} />
      );
    }
  };

  DecoratedComponent.displayName = `waited(${displayName(Component)})`;

  return DecoratedComponent;
};

export default waitUntil;
