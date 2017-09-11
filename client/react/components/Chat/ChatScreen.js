import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { selectSocket } from '../../../redux/selectors/socket';

import Flex from '../Flex';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import TypingHintText from './TypingHintText';
import { post } from '../../../redux/actions/network';

/**
 * The right side of the screen, where the actual chat is taking place.
 */
@connect(state => ({
  socket: selectSocket(state)
}))
export default class ChatScreen extends Component {
  static propTypes = {
    to: PropTypes.string // ID of the receiving is currently talking to.
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      input: '',
      messages: [],
      participantTyping: false,
      participantName: ''
    };
  }

  _onChange = input => {
    this.setState({
      input
    });
  };

  _onTypeStart = () => {
    let { to, socket } = this.props;
    socket.emit('type_start', {
      to
    });
  };

  _onTypeEnd = () => {
    let { to, socket } = this.props;
    socket.emit('type_end', {
      to
    });
  };

  _onSubmit = () => {
    // Empty submit check
    if (!this.state.value) return;

    let { to, socket } = this.props;

    // Send submission over socket
    socket.emit('sendMessage', {
      to,
      message: this.state.value
    });

    // Update own state
    this.setState(state => ({
      value: '',
      messages: state.messages.concat({
        type: 'out',
        content: state.value,
        timestamp: new Date()
      })
    }));
  };

  _onReceiveMessage = ({ from, message, createdAt }) => {
    if (from === this.props.to) { // Check if it is from the current connected user
      this.setState(state => ({
        messages: state.messages.concat({
          type: 'in',
          content: message,
          timestamp: new Date(createdAt)
        })
      }));
    }
  };

  _onIncomingTypeStart = () => {
    this.setState({
      participantTyping: true
    });
  };

  _onIncomingTypeEnd = () => {
    this.setState({
      participantTyping: false
    });
  };

  componentWillMount() {
    new Promise(resolve => this.setState({
      loading: true
    }, resolve)).then(() => Promise.all([
      post('/chat/getMessages', {
        participant: this.props.to,
        indexStart: 0
      }),
      post('/user/getName', {
        target: this.props.to
      })
    ])).then(responses => Promise.all(
      responses.map(response => response.body())
    )).then(([messageResponseBody, nameResponseBody]) => {
      this.setState({
        participantName: nameResponseBody.name,
        messages: messageResponseBody.messages
          ? messageResponseBody.messages.map(({ createdAt, from, message }) => ({
            type: from === this.props.to ? 'in' : 'out',
            content: message,
            timestamp: new Date(createdAt)
          }))
          : [],
        loading: false
      });
    });
  }

  componentDidMount() {
    let { socket } = this.props;
    // Register socket event listeners
    socket.addListener('receiveMessage', this._onReceiveMessage);
    socket.addListener('type_start', this._onIncomingTypeStart);
    socket.addListener('type_end', this._onIncomingTypeEnd);

  }

  componentWillUnmount() {
    let { socket } = this.props;
    // Unregister socket event listeners
    socket.removeListener('receiveMessage', this._onReceiveMessage);
    socket.removeListener('type_start', this._onIncomingTypeStart);
    socket.removeListener('type_end', this._onIncomingTypeEnd);
  }

  render() {
    let { input, messages, participantName, participantTyping } = this.state;

    return (
      <Flex column grow={1}>
        <ChatDisplay
          messages={messages}
        />
        <ChatInput
          value={input}
          onChange={this._onChange}
          onTypeStart={this._onTypeStart}
          onTypeEnd={this._onTypeEnd}
          onSubmit={this._onSubmit}
        />
        {participantTyping && <TypingHintText participantName={participantName} />}
      </Flex>
    );
  }
}