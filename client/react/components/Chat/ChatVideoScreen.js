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

// TODO connect
@withStyles(styles)
export default class ChatVideo extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired, // Other participant's id
    peer: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      call: null
    };
  }

  _startCall = () => {
    let { peer, to } = this.props;

    peer.call(to);
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