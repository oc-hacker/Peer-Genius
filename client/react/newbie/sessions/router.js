import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../../components';
import SessionChat from './sessionChat';
import ReviewSession from './review';

export default class SessionsRouter extends Component {
  render() {
    let { match: { url } } = this.props;

    return (
      <div>
        <Route key={'chat'} exact path={`${url}`} component={SessionChat} />,
        <Route key={'review'} path={`${url}/review`} component={ReviewSession} />
      </div>
    );
  }
}