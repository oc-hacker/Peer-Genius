import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
};

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
      call: null, // If null then in initial state
      active: false // If true then call is active
    };

    /*
     * Status logic:
     * call is null, active is false -> initial screen
     * call is null, active is true -> outgoing call
     * call is not null, active is false -> incoming call
     * call is not null, active is true -> call fully active
     */
  }

  /**
   * Start an outgoing call.
   */
  _startCall = () => {
    let { peer, to } = this.props;

    // TODO check what http://cdn.peerjs.com/demo/videochat/ is doing to make the call work
    let call = peer.call(to, /* TODO outgoing stream */);
    this.setState({
      active: true
    });

    call.on('stream', incomingStream => {

    });
  };

  _onCall = call => {
    console.log(call);
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

    return (
      <div className={classes.root}>

      </div>
    );
  }
}