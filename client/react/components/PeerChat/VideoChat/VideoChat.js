import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import Peer from 'peerjs';

import { serverURL } from '../../../../config';
import { post } from '../../../redux/actions/network';

export default class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f: null
    };
  }

  /**
   * 
   */
  render() {
    const { toId, match } = this.props;
    return (
      <div />
    );
  }
}