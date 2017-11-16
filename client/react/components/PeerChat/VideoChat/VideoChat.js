import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';
import VideoIcon from 'material-ui-icons/Videocam';
import AudioIcon from 'material-ui-icons/Call';

import 'webrtc-adapter';
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
      peerConnection: null,
      sessionDescription: null,
      incomingSession: null,
      outgoingVideo: false,
      outgoingAudio: false
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
      let incomingSession = JSON.parse(incomingOffer.data);
      console.log(incomingSession);

      this.setState({
        incomingSession
      }, () => {
        this.props.setVideo(true);

        if (this.state.outgoingVideo) {
          // Already have video outgoing, this is the other side's response.
          // TODO
        }
      });

    }
  };

  _onRemoteCandidate = incomingCandidate => {
    let iceCandidate = new RTCIceCandidate(JSON.parse(incomingCandidate.data));
    this.state.peerConnection.addIceCandidate(iceCandidate);
  };

  _setOutgoing = (outgoingVideo, outgoingAudio) => {
    this.setState({
      outgoingVideo,
      outgoingAudio
    });
  };

  _startVideo = async () => {
    await this._initMedia({ video: true, audio: true });
    this._sendSessionOffer();
    this._setOutgoing(true, false);
  };

  _startAudio = async () => {
    await  this._initMedia({ audio: true });
    this._sendSessionOffer();
    this._setOutgoing(false, true);
  };

  _acceptVideo = async () => {
    await this._initMedia({ video: true, audio: true });

    let { peerConnection, incomingSession } = this.state;
    // Display incoming stream
    peerConnection.setRemoteDescription(incomingSession.sdp);
    // Reply with outgoing stream
    this._sendSessionOffer();

    this._setOutgoing(true, false);
  };

  _acceptAudio = async () => {
    await this._initMedia({ audio: true });
    // TODO
    this._setOutgoing(false, true);
  };

  _endCall = () => {
    // TODO
    this._setOutgoing(false, false);
  };

  _onVideoButtonClick = () => {
    let { incomingSession, outgoingVideo } = this.state;

    if (outgoingVideo) {
      this._endCall();
    }
    else if (incomingSession) {
      this._acceptVideo();
    }
    else {
      this._startVideo();
    }
  };

  _onAudioButtonClick = () => {
    let { incomingSession, outgoingAudio } = this.state;

    if (outgoingAudio) {
      this._endCall();
    }
    else if (incomingSession) {
      this._acceptAudio();
    }
    else {
      this._startAudio();
    }
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
    let { classes, toId, match } = this.props;
    let { incomingSession, outgoingVideo, outgoingAudio } = this.state;

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
          {incomingSession && (
            <Text>
              Incoming call.
            </Text>
          )}
          <Flex
            justify="center"
          >
            {outgoingAudio ? null : (
              <Button
                fab
                colors={outgoingVideo ? red : green}
                onClick={this._onVideoButtonClick}
              >
                <VideoIcon />
              </Button>
            )}
            <Spacer width="1em" />
            {outgoingVideo ? null : (
              <Button
                fab
                colors={outgoingAudio ? red : green}
                onClick={this._onAudioButtonClick}
              >
                <AudioIcon />
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  }
}