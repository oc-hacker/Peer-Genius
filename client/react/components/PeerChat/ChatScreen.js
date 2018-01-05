import React, { Component } from 'react';

import { CircularProgress } from 'material-ui/Progress';

import Flex from '../Flex';
import Text from '../Text';
import { post } from '../../../redux/actions/network';
import TextChat from './TextChat';
import VideoChat from './VideoChat';

import { connect } from 'react-redux';
import { socketEmit } from '../../../redux/actions/creators/socket';

@connect(null, dispatch => {
  socketEmit
})
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      video: false,
      toId: '',
    };
  }

  setVideo = video => {
    this.setState({
      video
    });
  };

  _getToId = async () => {
    let { match: { params }, mode } = this.props;

    // Load session data
    let response = await post('/api/session/info', {
      sessionId: params.sessionId
    });
    this.setState({
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

  _init = async () => {
    this.setState({
      loading: true
    });

    let toId = await this._getToId();

    this.setState({
      toId,
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

  render = async () => {
    let { match } = this.props;
    let { loading, error, video, toId } = this.state;

    // refresh page if chat session changed
    if (match.params.sessionId != this.state.sessionId) {
      if (this.props.mode == 'guru') {
        await this.props.socketEmit('updateVolunteerTime', {
          action: 'stop'
        });
        await this._init();
        await this.props.socketEmit('updateVolunteerTime', {
          action: 'wakeup'
        });
      }
      await this._init();

    }


    if (error) {
      return (
        <Text color="error">
          Error when initializing chat client. Please reload.
          <br />
          If the problem persists, contact a developer.
        </Text>
      );
    }

    if (loading) {
      return (
        <Flex
          grow={1}
          column
          align="center"
          justify="flex-start"
        >
          <CircularProgress />
        </Flex>
      );
    }

    return (
      <Flex
        grow={1}
        align="stretch"
      >
        <VideoChat
          active={video}
          setVideo={this.setVideo}
          toId={toId}
          match={match}
        />
        <TextChat
          active={!video}
          setVideo={this.setVideo}
          toId={toId}
          match={match}
        />
      </Flex>
    );
  }
}
