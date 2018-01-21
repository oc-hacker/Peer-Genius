import React, { Component } from 'react';

import { CircularProgress } from 'material-ui/Progress';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { waitUntil } from '../HOC';
import Flex from '../Flex';
import Text from '../Text';
import TextChat from './TextChat';
import VideoChat from './VideoChat';

import { selectUserId } from '../../../redux/selectors/user';
import { post } from '../../../redux/actions/network';
import { socketEmit } from '../../../redux/actions/creators/socket';

@connect(createStructuredSelector({
  userId: selectUserId
}), {
  socketEmit,
  push
})
@waitUntil(props => props.userId)
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      video: false,
      toId: '',
      isClosed: false
    };
  }

  setVideo = video => {
    this.setState({
      video
    });
  };

  _getToId = async () => {
    let { match: { params }, userId } = this.props;

    // Load session data
    let response = await post('/api/session/info', {
      sessionId: params.sessionId
    });
    this.setState({
      sessionId: params.sessionId
    });
    let { session } = await response.json();

    console.log(userId, session.guruId, session.newbieId);
    return userId === session.guruId ? session.newbieId : session.guruId;
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

  _close = () => {
    let { match, mode, push } = this.props;

    this.setState({
      isClosed: true
    });

    if (mode === 'newbie') {
      // Bring up review screen for newbie
      push(`${match.url}/review`);
    }
  };

  componentWillReceiveProps = async (nextProps) => {
    //refresh chat if session has changed
    if (nextProps.match.params.sessionId !== this.state.sessionId) {
      // these props don't change so it's safe to use them
      if (this.props.mode === 'guru') {
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

  render = () => {
    let { match } = this.props;
    let { loading, error, video, toId, isClosed } = this.state;

    if (error) {
      return (
        <Text color='error'>
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
          align='center'
          justify='flex-start'
        >
          <CircularProgress />
        </Flex>
      );
    }

    return (
      <Flex
        grow={1}
        align='stretch'
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
          close={this._close}
          isClosed={isClosed}
        />
      </Flex>
    );
  };
}
