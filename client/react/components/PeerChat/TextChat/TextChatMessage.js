import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

const styles = ({ palette: { primary, grey }, spacing }) => ({
  root: {
    position: 'relative',
    backgroundColor: grey[200],
    padding: spacing.unit / 2,
    borderRadius: 8,

    '&:before': {
      position: 'absolute',
      content: '""',
      top: 'auto',
      bottom: 'auto',
      borderWidth: '15px 0',
      borderStyle: 'solid',
      borderColor: ` transparent ${grey[200]}`
    }
  },
  incomingMessage: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    '&:before': {
      right: '100%',
      borderRightWidth: '15px'
    }
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
    marginRight: 20,
    '&:before': {
      left: '100%',
      borderLeftWidth: '15px'
    }
  }
});

@withStyles(styles)
export default class ChatMessage extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['in', 'out']).isRequired,
    content: PropTypes.string.isRequired
  };

  render() {
    let { classes, type, content } = this.props;
    return (
      <div className={classNames({
        [classes.root]: true,
        [classes.incomingMessage]: type === 'in',
        [classes.outgoingMessage]: type === 'out'
      })}>
        {content}
      </div>
    );
  }
}