import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import Flex from '../Flex';
import ChatMessage from './ChatMessage';

const styles = ({ palette: { grey }, spacing }) => ({
  window: {
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  loading: {
    alignSelf: 'center'
  },
  inboundMessage: {
    alignSelf: 'flex-end'
  },
  outboundMessage: {
    borderRadius: spacing.unit / 2,
    backgroundColor: grey[500],
    alignSelf: 'flex-start'
  },
});

@withStyles(styles)
export default class ChatDisplay extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['in', 'out']), // Inbound vs outbound messages,
      content: PropTypes.string,
      timestamp: PropTypes.instanceOf(Date)
    }))
  };

  render() {
    let { classes, loading, messages } = this.props;

    return (
      <Flex column grow={1}>
        <Flex column justify="flex-end">
          {loading && (
            <CircularProgress className={classes.loading} />
          )}
          {messages.map(({ type, content, timestamp }, index) => (
            <ChatMessage key={timestamp.getTime()} type={type} content={content} timestamp={timestamp} />
          ))}
        </Flex>
      </Flex>
    );
  }
}