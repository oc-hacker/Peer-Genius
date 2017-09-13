import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import ChatScreen from './ChatScreen';

import { post } from '../../../redux/actions/network';
import { selectUserId } from '../../../redux/selectors/user';

export default class Chat extends Component {
  static defaultProps = {
    sessionID: PropTypes.string.isRequired,
    selectParticipant: PropTypes.func.isRequired, // Will be called with the ORM session object, should return the id of the other participant.
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      to: ''
    };
  }

  componentWillMount() {
    post('/api/session/info', {
      session: this.props.sessionID
    })
      .then(response => response.body())
      .then(({ session }) => this.setState({
        loading: false,
        to: this.props.selectParticipant(session)
      }));
  }

  render() {
    let { loading, to } = this.state;
    // TODO Currently only has message, no recent messages panel

    if (loading) {
      return null;
    }
    else {
      // Giving ChatScreen a key forces it to remount when `to` changes.
      return (
        <ChatScreen key={to} to={to} {...this.props} />
      );
    }
  }
}
