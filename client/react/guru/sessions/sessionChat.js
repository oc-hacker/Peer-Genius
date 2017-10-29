import React, { Component } from 'react';

import { PeerChat } from '../../components';

export default class SessionChat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PeerChat
        {...this.props}
        mode='guru'
      />
    );
  }
}