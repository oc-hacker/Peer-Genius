import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';

import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import Peer from 'peerjs';

import Flex from '../Flex';
import Text from '../Text';

import { serverURL } from '../../../config';
import { post } from '../../../redux/actions/network';
import TextChat from './TextChat';
import VideoChat from './VideoChat';

const styles = {
  root: {
    position: 'relative',
  }
};

@withStyles(styles)
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      video: false,
      toId: '',
      peer: null,
    };
  }

  _getToId = async () => {
    let { match: { params }, mode } = this.props;

    // Load session data
    let response = await post('/api/session/info', {
      sessionId: params.sessionId
    });
    let { session } = await response.json();

    if (mode === 'newbie') {
      return session.guruId;
    }
    if (mode === 'guru') {
      return session.newbieId;
    }
    return null;
  };

  _getPeer = async toId => {
    // Initialize peerjs connection
    let peer = new Peer(toId, {
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

  _init = async () => {
    this.setState({
      loading: true
    });

    let toId = await this._getToId();
    let peer = await this._getPeer(toId);

    this.setState({
      toId,
      peer,
      loading: false
    });
  };

  componentWillMount() {
    this._init()
      .catch(error => {
        console.error(error);
        this.setState({
          error: true
        });
      });
  }

  render() {
    let { classes, match } = this.props;
    let { loading, error, video, toId, peer } = this.state;

    if (error) {
      return (
        <Text color='error'>
          Error when initializing chat client.
        </Text>
      );
    }

    if (loading) {
      return (
        <Flex
          grow={1}
          column
          align='center'
          justify='flex-start'
        >
          <CircularProgress />
        </Flex>
      );
    }

    if (video) {
      return (
        <VideoChat
          toId={toId}
          match={match}
        />
      );
    }
    else {
      return (
        <TextChat
          toId={toId}
          match={match}
        />
      );
    }
  }
}