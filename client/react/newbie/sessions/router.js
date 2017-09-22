import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Flex, Route } from '../../components';
import { withProps } from '../../components/HOC';
import SessionChat from './sessionChat';
import ReviewSession from './review';

export default class SessionsRouter extends Component {
  render() {
    let { match: { url, params } } = this.props;

    return (
      <Flex grow={1}>
        <Route path={`${url}`} component={SessionChat} />
        <Route path={`${url}/:sessionID/review`} component={ReviewSession} />
      </Flex>
    );
  }
}