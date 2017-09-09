import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../../components';
import SessionsList from './list';
import SessionDetails from './details';

export default class SessionsRouter extends Component {
  render() {
    let { match: { url } } = this.props;

    return (
      <Switch>
        <Route exact path={`${url}`} component={SessionsList} />
        <Route path={`${url}/:sessionID`} component={SessionDetails} />
      </Switch>
    );
  }
}