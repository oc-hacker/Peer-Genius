/* eslint-disable no-unused-vars,no-useless-constructor */

// @flow

declare type RTCSessionDescription = {
  type: 'answer' | 'offer' | 'pranswer' | 'rollback',
  sdp: string,
  toJSON: (object) => string
}

declare type RTCCertificate = {
  expires: Date
}

declare type RTCIceServer = {
  credential: string,
  credentialType: string,
  urls: string[],
  userName: string
}

declare type RTCConfiguration = {
  bundlePolicy?: 'balanced' | 'max-compact' | 'max-bundle',
  certificates?: RTCCertificate[],
  iceCandidatePoolSize?: number,
  iceServers?: RTCIceServer[],
  iceTransportPolicy?: string,
  peerIdentity?: string,
  rtcpMuxPolicy?: string
}

declare type RTCSctpTransport = {
  maxMessagingSize: number,
  transport: any
}

// https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
declare class RTCDataChannel {
  binaryType: 'blob' | 'arraybuffer';
  bufferedAmount: number;
  bufferedAmountLowThreshold: number;
  id: number;
  label: string;
  maxPacketLifetime: number;
  maxRetransmits: number;
  negotiated: boolean;
  ordered: boolean;
  protocol: string;
  readyState: string;

  onbufferedamountlow: (Event) => any;
  onclose: (Event) => any;
  onerror: (Event) => any;
  onmessage: (MessageEvent) => any;
  onopen: (Event) => any;
}

declare type RTCDataChannelEvent = Event & {
  channel: RTCDataChannel
}

declare type RTCIdentityEvent = Event & {
  assertion: string
}

declare type RTCIdentityErrorEvent = Event & {
  idp: string,
  loginUrl: string | null,
  protocol: string
}

declare type RTCTrackEvent = Event & {
  track: MediaStreamTrack,
  streams: MediaStream[]
}

declare type RTCRtpSender = {
  track: MediaStreamTrack
}

declare type RTCRtpReceiver = {
  track: MediaStreamTrack
}

// https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
declare class RTCPeerConnection extends EventTarget {
  constructor(configuration: ?RTCConfiguration): RTCPeerConnection;
  canTrickleIceCandidates: boolean;
  connectionState: string;
  currentLocalDescription: RTCSessionDescription;
  currentRemoteDescription: RTCSessionDescription;
  defaultIceServers: RTCIceServer[];
  iceConnectionState: string;
  iceGatheringState: string;
  localDescription: RTCSessionDescription;
  peerIdentity: ?{ name: string };
  pendingLocalDescription: RTCSessionDescription;
  pendingRemoteDescription: RTCSessionDescription;
  remoteDescription: RTCSessionDescription;
  sctp: RTCSctpTransport;
  signalingState: string;

  onconnectionstatechange: (Event) => any;
  ondatachannel: (RTCDataChannelEvent) => any;
  onicecandidate: (Event) => any;
  oniceconnectionstatechange: (Event) => any;
  onicegatheringstatechange: (Event) => any;
  onidentityresult: (RTCIdentityEvent) => any;
  onidpassertionerror: (RTCIdentityErrorEvent) => any;
  onidpvalidationerror: (RTCIdentityErrorEvent) => any;
  onnegotiationneeded: (Event) => any;
  onpeeridentity: (Event) => any;
  onremovestream: (Event) => any;
  onsignalingstatechange: (Event) => any;
  ontrack: (RTCTrackEvent) => any;

  addIceCandidate(candidate: RTCIceServer): void;
  addTrack(rack: MediaStreamTrack): void;
  close(): void;
  createAnswer(): Promise<RTCSessionDescription>;
  createDataChannel(): RTCDataChannel;
  createOffer(): Promise<RTCSessionDescription>;
  generateCertificate(): RTCCertificate;
  getConfiguration(): RTCConfiguration;
  getIdentityAssertion(): void;
  getLocalStreams(): MediaStream[];
  getReceivers(): RTCRtpReceiver[];
  getRemoteStreams(): MediaStream[];
  getSenders(): RTCRtpSender[];
  getStreamById(id: string): MediaStream | null;
  removeTrack(track: MediaStreamTrack): void;
  setConfiguration(configuration: RTCConfiguration): void;
  setIdentityProvider(idp: any): void; // TODO
  setLocalDescription(description: RTCSessionDescription): void;
  setRemoteDescription(description: RTCSessionDescription): void;
}
