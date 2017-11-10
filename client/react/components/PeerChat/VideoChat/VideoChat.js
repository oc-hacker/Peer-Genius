import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import VideoIcon from 'material-ui-icons/Videocam';
import AudioIcon from 'material-ui-icons/Call';

import 'webrtc-adapter';
import { connect } from 'react-redux';

import Flex from '../../Flex';
import Button from '../../Button';

import { socketAttachListener, socketDetachListener, socketEmit } from '../../../../redux/actions/creators/socket';

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
    bottom: '1em'
  },
  buttonBar: {
    position: 'absolute',
    width: '100%',
    bottom: '1em'
  }
};

@connect(null, {
  socketEmit,
  socketAttachListener,
  socketDetachListener
})
@withStyles(styles)
export default class VideoChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peerConnection: null,
      sessionDescription: null,
      incomingSession: null,
    };
  }

  _init = async () => {
    let peerConnection = new RTCPeerConnection({
      iceServers: [{
        urls: 'stun:stun.stunprotocol.org:3478'
      }, {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ]
      }]
    });

    // Create a session offer and set it as the local description
    let sessionDescription = await peerConnection.createOffer();
    peerConnection.setLocalDescription(sessionDescription);

    // Save connection to state for future use
    this.setState({
      peerConnection,
      sessionDescription
    });

    // Connection event handlers
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socketEmit('peer_candidate', {
          receiverId: this.props.toId,
          data: JSON.stringify(event.candidate)
        });
      }
    };

    peerConnection.onaddstream = event => {
      this._remoteVideo.srcObject = event.stream;
    };
  };

  _initMedia = async constraints => {
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    this._localVideo.srcObject = stream;
    this.state.peerConnection.addStream(stream);
  };

  _sendSessionOffer = () => {
    let { toId, socketEmit } = this.props;
    let { sessionDescription } = this.state;

    socketEmit('peer_offer', {
      receiverId: toId,
      data: JSON.stringify(sessionDescription)
    });
  };

  _onRemoteOffer = incomingOffer => {
    if (incomingOffer.senderId === this.props.toId) {
      this.setState({
        incomingSession: JSON.parse(incomingOffer.data)
      });
    }
  };

  _onRemoteCandidate = incomingCandidate => {
    let iceCandidate = new RTCIceCandidate(JSON.parse(incomingCandidate.data));
    this.state.peerConnection.addIceCandidate(iceCandidate);
  };

  componentWillMount() {
    this._init();
  }

  componentDidMount() {
    let { socketAttachListener } = this.props;
    socketAttachListener('peer_offer', this._onRemoteOffer);
    socketAttachListener('peer_candidate', this._onRemoteCandidate);
  }

  componentWillUnmount() {
    let { socketDetachListener } = this.props;
    socketDetachListener('peer_offer', this._onRemoteOffer);
    socketDetachListener('peer_candidate', this._onRemoteCandidate);
  }

  render() {
    const { classes, toId, match } = this.props;

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
        />
        <video
          className={classes.localVideo}
          ref={video => this._localVideo = video}
          muted
        />
        <Flex
          className={classes.buttonBar}
          justify="center"
        >
          <Button
            fab
            onClick={async () => {
              await this._initMedia({ video: true, audio: true });
              this._sendSessionOffer();
            }}
          >
            <VideoIcon />
          </Button>
          <Button
            fab
            onClick={async () => {
              await  this._initMedia({ audio: true });
              this._sendSessionOffer();
            }}
          >
            <AudioIcon />
          </Button>
        </Flex>
      </Flex>
    );
  }
}