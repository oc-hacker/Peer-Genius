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
    mode: PropTypes.oneOf(['guru', 'newbie'])
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
    console.log('Initializing chat');
    console.log(this);

    let to = await this._initInfo();
    let peer = await this._initPeer(to);

    this.setState({
      to,
      peer
    });
  };

  _initInfo = async () => {
    // Load session data
    let response = await post('/api/session/info', {
      sessionId: this.props.match.params.sessionID
    });
    let { session } = await response.json();

    return session[`${this.props.mode}Id`];
  };

  _initPeer = async to => {
    // Initialize peerjs connection
    let peer = new Peer(to, {
      host: /^https?:\/\/(\S+)$/.exec(serverURL)[1],
      port: 80,
      path: '/peerjs'
    });

    // Attach call hook. Only switch screen - leave handling of actual display change to the video screen.
    peer.on('call', () => {
      this.setState({
        video: true
      });
    });

    return peer;
  };

  _switchScreen = () => {
    this.setState(state => ({
      video: !state.video
    }));
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
      <ChatVideoScreen
        to={to}
        peer={peer}
        switch={this._switchScreen}
      />
    ) : (
      <ChatTextScreen
        to={to}
        sessionId={this.props.match.params.sessionId}
        switch={this._switchScreen}
      />
    );
  }
}
