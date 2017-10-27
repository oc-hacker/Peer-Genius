import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import CallIcon from 'material-ui-icons/Call';
import CallEndIcon from 'material-ui-icons/CallEnd';

import { connect } from 'react-redux';

import Flex from '../Flex';
import Button from '../Button';

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
};

// Compatability
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

@withStyles(styles)
export default class ChatVideoScreen extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired, // Other participant's id
    peer: PropTypes.object.isRequired,
    switch: PropTypes.func.isRequired // Used to switch between video and chat
  };

  constructor(props) {
    super(props);

    this.state = {
      call: null,
      incomingStream: null,
      outgoingStream: null
    };
  }

  /**
   * Start an outgoing call.
   */
  _startCall = () => {
    let { peer, to } = this.props;

    // TODO check what http://cdn.peerjs.com/demo/videochat/ is doing to make the call work
    let call = peer.call(to, /* TODO outgoing stream */);

    call.on('stream', incomingStream => {
      this.setState({
        incomingStream
      });
    });

    call.on('close', this._onCallEnd);
  };

  /**
   * Indicate an incoming call
   */
  _onCall = call => {
    this.setState({
      call
    });

    call.on('close', this._onCallEnd);
  };

  _onCallEnd = () => {
    this.setState({
      incomingStream: null,
      outgoingStream: null
    });
  };

  componentWillMount() {
    let { peer } = this.props;

    peer.on('open', id => {
      console.log('Opened with id ' + id);
    });

    peer.on('call', this._onCall);
  }

  render() {
    let { classes } = this.props;
    let { call, incomingStream, outgoingStream } = this.state;
    if (incomingStream) {
      if (outgoingStream) {
        // Call active
        return (
          <div className={classes.root}>
            <video
              src={URL.createObjectURL(incomingStream)}
              autoPlay
            />
            <video
              src={window.URL.createObjectURL(outgoingStream)}
              autoPlay
              muted
            />
          </div>
        );
      }
      else {
        // Incoming call, waiting for response
        return (
          <Flex
            column
            className={classes.root}
          >
            <Flex
              align="center"
              justify="space-around"
            >
              Incoming call
            </Flex>
            <Flex
              align="flex-end"
              style={{ alignSelf: 'center' }}
              justify="space-around"
            >
              <Flex column>
                <Button
                  color="red"
                  fab
                >
                  <CallEndIcon />
                </Button>
                Decline
              </Flex>
              <Flex column>
                <Button
                  color="green"
                  fab
                >
                  <CallIcon />
                </Button>
                Accept
              </Flex>
            </Flex>
          </Flex>
        );
      }
    }
    else {
      if (outgoingStream) {
        // Outgoing call, waiting for pickup
        return (
          <Flex
            column
            className={classes.root}
          >
            <Flex
              align="center"
              justify="space-around"
            >
              Waiting for response...
            </Flex>
            <Flex
              align="flex-end"
              justify="center"
            >
              <Button
                color="red"
                fab
              >
                <CallEndIcon />
              </Button>
              Cancel
            </Flex>
          </Flex>
        );
      }
      else {
        // No call active. Show UI for letting the user start a call.
        // TODO
      }
    }
  }
}