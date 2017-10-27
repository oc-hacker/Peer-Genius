import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import Flex from '../Flex';

import { post } from '../../../redux/actions/network';
import { selectUserId } from '../../../redux/selectors/user';

@connect(state => ({
  userId: selectUserId(state)
}))
export default class RecentChats extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['newbie', 'guru'])
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recent: []
    };
  }

  _loadRecentSessions = async () => {
    let { mode } = this.props;

    this.setState({
      loading: true
    });

    // Fetch recent sessions
    let response = await post('/api/session/recent');

    let { recentSessions } = await response.json();
    console.log(recentSessions);

    this.setState({
      loading: false,
      recent: recentSessions
        .map(session => ({
          participantName: session[mode][`${mode}Name`]
        }))
    });
  };

  componentWillMount() {
    this._loadRecentSessions().catch(error => {
      console.error('Unexpected error when loading recent sessions:\n', error);
    });
  };

  render() {
    return (
      <Flex column>
        Hello world!
        TODO
      </Flex>
    );
  }
}