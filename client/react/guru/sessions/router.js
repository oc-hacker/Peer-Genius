import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../../components';
import SessionChat from './sessionChat';

export default class SessionsRouter extends Component {
  render() {
    let { match: { url } } = this.props;

    return (
      <Switch>
        <Route
          path={url}
          component={SessionChat}
        />
      </Switch>
    );
  }
}