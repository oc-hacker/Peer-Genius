import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = ({ palette: { grey } }) => ({
  text: {
    color: grey[600]
  }
});

@withStyles(styles)
export default class TypingHintText extends Component {
  static propTypes = {
    participantName: PropTypes.string
  };

  render() {
    return (
      <p className={this.props.classes.text}>${this.props.participatnName} is typing...</p>
    );
  }
}