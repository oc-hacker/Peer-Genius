import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Flex, Route } from '../../components';
import SessionChat from './sessionChat';
import ReviewSession from './review';

export default class SessionsRouter extends Component {
  render() {
    let { match: { url } } = this.props;

    return (
      <Flex grow={1}>
        <Route path={`${url}`} component={SessionChat} />
        <Route path={`${url}/review`} component={ReviewSession} />
      </Flex>
    );
  }
}