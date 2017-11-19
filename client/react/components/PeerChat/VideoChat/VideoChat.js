import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';
import VideoIcon from 'material-ui-icons/Videocam';
import AudioIcon from 'material-ui-icons/Call';
import HangIcon from 'material-ui-icons/CallEnd';

// import 'webrtc-adapter';
import SimplePeer from 'simple-peer';
import { connect } from 'react-redux';

import Flex from '../../Flex';
import Button from '../../Button';
import Spacer from '../../Spacer';

import { socketAttachListener, socketDetachListener, socketEmit } from '../../../../redux/actions/creators/socket';
import { waitUntil } from '../../HOC';
import Text from '../../Text';

const styles = {
  root: {
    position: 'relative'
  },
  remoteVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  localVideo: {
    position: 'absolute',
    width: '25%',
    height: '25%',
    right: '1em',
    bottom: '1em',
    transform: 'rotateY(180deg)'
  },
  buttonBar: {
    position: 'absolute',
    width: '100%',
    bottom: '1em'
  }
};

@connect(state => ({
  hasSocket: state.socket
}), {
  socketEmit,
  socketAttachListener,
  socketDetachListener
})
@waitUntil(props => props.hasSocket)
@withStyles(styles)
export default class VideoChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peer: null,
      inType: null,
      outType: null
    };
  }

  _basePeerOptions = {
    offerConstraints: {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    },
    answerConstraints: {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    }
  };

  get _actionButtons() {
    const spacer = <Spacer width="1em" />;
    let { inType, outType, peer } = this.state;

    switch (outType) {
      case 'V':
      case 'A':
        return (
          <Button
            key="hang"
            fab
            colors={red}
            onClick={this._stopCall}
          >
            <HangIcon />
          </Button>
        );
      default:
        switch (inType) {
          case 'V':
          case 'A':
            return [
              <Button
                key="video"
                fab
                colors={green}
                onClick={this._acceptVideo}
              >
                <VideoIcon />
              </Button>,
              spacer,
              <Button
                key="audio"
                fab
                colors={green}
                onClick={this._acceptAudio}
              >
                <AudioIcon />
              </Button>,
              spacer,
              <Button
                key="hang"
                fab
                colors={red}
                onClick={this._stopCall}
              >
                <HangIcon />
              </Button>
            ];
          default:
            return [
              <Button
                key="video"
                fab
                colors={green}
                onClick={this._startVideo}
              >
                <VideoIcon />
              </Button>,
              spacer,
              <Button
                key="audio"
                fab
                colors={green}
                onClick={this._startAudio}
              >
                <AudioIcon />
              </Button>
            ];
        }
    }
  }

  _startVideo = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    let peer = new SimplePeer({ initiator: true, stream, ...this._basePeerOptions });

    this._localVideo.srcObject = stream;
    this._initPeer(peer);

    let { socketEmit, toId } = this.props;

    this.setState({
      outType: 'V'
    });
    socketEmit('webrtc_offer', {
      receiverId: toId,
      data: 'V'
    });
  };

  _startAudio = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    let peer = new SimplePeer({ initiator: true, stream, ...this._basePeerOptions });

    this._localVideo.srcObject = stream;
    this._initPeer(peer);

    let { socketEmit, toId } = this.props;

    this.setState({
      outType: 'A'
    });
    socketEmit('webrtc_offer', {
      receiverId: toId,
      data: 'A'
    });
  };

  /**
   * Respond with a video stream.
   */
  _acceptVideo = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    let peer = new SimplePeer({ stream, ...this._basePeerOptions });

    this._localVideo.srcObject = stream;
    this._initPeer(peer);

    this.setState({
      outType: 'V'
    });
  };

  /**
   * Respond with an audio stream.
   */
  _acceptAudio = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    let peer = new SimplePeer({ stream, ...this._basePeerOptions });

    this._localVideo.srcObject = stream;
    this._initPeer(peer);

    this.setState({
      outType: 'A'
    });
  };

  _initPeer = peer => {
    let { toId, socketEmit } = this.props;

    this.setState({ peer });

    peer.on('signal', data => {
      socketEmit('webrtc_signal', {
        receiverId: toId,
        data: JSON.stringify(data)
      });
    });

    peer.on('stream', stream => {
      console.log(stream);
      this._remoteVideo.srcObject = stream;
    });
  };

  _stopCall = () => {
    let { toId, socketEmit } = this.props;

    socketEmit('webrtc_stop', {
      receiverId: toId
    });

    // Cleanup
    this._cleanupPeer();
  };

  /**
   * Called when a webrtc call ends to clean up peer and state.
   */
  _cleanupPeer = () => {
    this.state.peer && this.state.peer.destroy();
    this._localVideo.srcObject = null;
    this._remoteVideo.srcObject = null;

    this.setState({
      inType: null,
      outType: null,
      peer: null
    });

    setTimeout(() => {
      this.props.setVideo(false);
    }, 500);
  };

  // Socket event handlers
  _onOffer = ({ senderId, data }) => {
    let { toId, setVideo } = this.props;
    if (senderId === toId) {
      setVideo(true);
      this.setState({ inType: data });
    }
  };

  _onSignal = ({ senderId, data }) => {
    let { toId } = this.props;
    let { peer } = this.state;

    if (senderId === toId && peer) {
      peer.signal(JSON.parse(data));
    }
  };

  _onStop = ({ senderId }) => {
    if (senderId === this.props.toId) {
      // Cleanup
      this._cleanupPeer();
    }
  };

  componentDidMount() {
    let { socketAttachListener } = this.props;
    socketAttachListener('webrtc_offer', this._onOffer);
    socketAttachListener('webrtc_signal', this._onSignal);
    socketAttachListener('webrtc_stop', this._onStop);
  }

  componentWillUnmount() {
    let { socketDetachListener } = this.props;
    socketDetachListener('webrtc_offer', this._onOffer);
    socketDetachListener('webrtc_signal', this._onSignal);
    socketDetachListener('webrtc_stop', this._onStop);
  }

  render() {
    let { classes, toId, match } = this.props;

    if (!this.props.active) {
      return null;
    }

    return (
      <Flex
        grow={1}
        className={classes.root}
      >
        <video
          className={classes.remoteVideo}
          ref={video => this._remoteVideo = video}
          autoPlay
        />
        <video
          className={classes.localVideo}
          ref={video => this._localVideo = video}
          muted
          autoPlay
        />
        <Flex
          className={classes.buttonBar}
          align="center"
          column
        >
          <Flex justify="center">
            {this._actionButtons}
          </Flex>
        </Flex>
      </Flex>
    );
  }
}