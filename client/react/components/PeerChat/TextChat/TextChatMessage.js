import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

const styles = ({ palette: { primary, grey }, spacing }) => ({
  root: {
    position: 'relative',
    backgroundColor: grey[200],
    padding: spacing.unit,
    margin: spacing.unit / 2,
    borderRadius: 8,
    whiteSpace: 'pre',
    minWidth: '30%',

    '&:before': {
      position: 'absolute',
      content: '""',
      top: 'auto',
      bottom: 'auto',
      borderWidth: `${spacing.unit}px 0`,
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
  },
  timestamp: {
    width: '100%',
    fontSize: 10,
  },
  incomingTimestamp: {
    textAlign: 'right'
  },
  outgoingTimestamp: {
    textAlign: 'left'
  }
});

const months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];

@withStyles(styles)
export default class TextChatMessage extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['in', 'out']).isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date)
  };

  render() {
    let { classes, type, content, timestamp } = this.props;

    return (
      <div
        className={classNames({
          [classes.root]: true,
          [classes.incomingMessage]: type === 'in',
          [classes.outgoingMessage]: type === 'out'
        })}
      >
        {content}
        <div
          className={classNames({
            [classes.timestamp]: true,
            [classes.incomingTimestamp]: type === 'in',
            [classes.outgoingTimestamp]: type === 'out'
          })}
        >
          {`${timestamp.getDate()} ${months[timestamp.getMonth()]} ${timestamp.getHours() % 12}:${timestamp.getMinutes()} ${timestamp.getHours() >= 12 ? 'pm' : 'am'}`}
        </div>
      </div>
    );
  }
}