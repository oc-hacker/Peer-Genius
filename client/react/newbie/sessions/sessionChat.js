import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Chat } from '../../components';

export default class SessionChat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { match: { params } } = this.props;

    return (
      <Chat
        sessionID={params.sessionID}
        selectParticipant={session => session.guru}
      />
    );
  }
}