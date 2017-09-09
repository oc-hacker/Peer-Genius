import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route, withProps } from '../../../components';
import SessionDetails from './details';
import ReviewSession from './review';

export default class DetailsRouter extends Component {
  render() {
    let { match: { url, params } } = this.props;

    return (
      <Switch>
        <Route exact path={`${url}/`} render={withProps({ sessionID: params.sessionID })(SessionDetails)} />
        <Route path={`${url}/review`} render={withProps({ sessionID: params.sessionID })(ReviewSession)} />
      </Switch>
    );
  }
}