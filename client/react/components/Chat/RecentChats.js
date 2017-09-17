import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import Flex from '../Flex';

import { post } from '../../../redux/actions/network';

export default class RecentChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

    };
  }

  componentWillMount() {
    // Fetch recent sessions
    post('/api/session/recent')
      .then(response => response.json())
      .then(({ recentSessions }) => Promise.all([
        recentSessions.map(session => session)
      ]));
  }

  render() {
    return (
      <Flex column>

      </Flex>
    );
  }
}