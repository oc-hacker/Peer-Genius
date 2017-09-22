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

  _loadRecentSessions = async () => {
    // Fetch recent sessions
    let response = await post('/api/session/recent');

    let { recentSessions } = await response.json();

    // TODO
  };

  componentWillMount() {
    this._loadRecentSessions().catch(error => {
      console.error('Unexpected error when loading recent sessions:\n', error);
    });
  }

  render() {
    return (
      <Flex column>

      </Flex>
    );
  }
}