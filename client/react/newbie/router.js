import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../components';
import SessionsRouter from './sessions';
import NewbieDashboard from './newbieDashboard';

export default class NewbieRouter extends Component {
  render() {
    let { match: { url } } = this.props;

    return (
      <Switch>
        <Route exact path={`${url}`} component={NewbieDashboard} />
        <Route path={`${url}/sessions/:sessionID`} component={SessionsRouter} />
      </Switch>
    );
  }
}