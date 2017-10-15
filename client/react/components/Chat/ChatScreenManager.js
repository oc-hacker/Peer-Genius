import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import Peer from 'peerjs';

import Flex from '../Flex';
import ChatTextScreen from './ChatTextScreen';
import ChatVideoScreen from './ChatVideoScreen';
import { post } from '../../../redux/actions/network';
import { serverURL } from '../../../config';

export default class ChatScreenManager extends Component {
  static propTypes = {
    selectParticipant: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      to: '',
      video: false,
      peer: null
    };
  }

  _init = async () => {
    // Load session data
    let response = await post('/api/session/info');
    let { session } = await response.json();

    let to = this.props.selectParticipant(session);

    // Initialize peerjs connection
    let peer = new Peer(to, {
      host: serverURL,
      port: 80,
      path: '/peerjs'
    });

    this.setState({
      to,
      peer
    });
  };

  componentWillMount() {
    this._init();
  }

  render() {
    let { to, video, peer } = this.state;

    if (!to) {
      // Not finished loading yet
      return (
        <Flex
          align="center" justify="center"
          grow={2}
        >
          <CircularProgress />
        </Flex>
      );
    }

    return video ? (
      <ChatVideoScreen to={to} peer={peer} />
    ) : (
      <ChatTextScreen to={to} sessionId={this.props.match.params.sessionId} />
    );
  }
}
