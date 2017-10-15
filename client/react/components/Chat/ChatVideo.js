import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

// TODO connect
export default class ChatVideo extends Component {
  static propTypes = {
    peer: PropTypes.object.isRequired
  };

  _startCall = () => {
    let { peer } = this.props;

    // TODO
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
    return (
      <div>
        Hello world!
      </div>
    );
  }
}