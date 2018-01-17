import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import Flex from '../../Flex';
import TextChatMessage from './TextChatMessage';

const styles = ({ palette: { grey }, spacing }) => ({
  root: {
    overflowY: 'auto',
    padding: 0,
    flexGrow: 5,
    flexBasis: 0
  },
  messageList: {
    listStyle: 'none',
    margin: 0,
    padding: '16px 0'
  },
  window: {
    overflowX: 'hidden',
    overflowY: 'auto'
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
export default class MessageDisplay extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf(['in', 'out']), // Inbound vs outbound messages
      content: PropTypes.string,
      timestamp: PropTypes.instanceOf(Date)
    }))
  };

  componentDidUpdate() {
    // When component updates - caused by a change in loading status or message - scroll to bottom.
    if (this._root && this._ul) {
      console.log(this._root.scrollTop = this._ul.clientHeight - this._root.clientHeight);
    }
  }

  render() {
    let { classes, loading, messages } = this.props;

    if (loading) {
      return (
        <Flex
          column
          grow={1}
          align='center'
          justify='flex-start'
        >
          <CircularProgress />
        </Flex>
      );
    }

    return (
      <div
        className={classes.root}
        ref={root => this._root = root}
      >
        <Flex
          component={'ul'}
          className={classes.messageList}
          rootRef={ul => this._ul = ul}
          column
        >
          {messages.map(({ id, type, content, timestamp }, index) => {
            if (!content.includes('data:image')) {
              return (
                <TextChatMessage
                  key={id}
                  type={type}
                  content={content}
                  timestamp={timestamp}
                />
              );
            } else {
              return (
                <img
                  src={content}
                  style={{ maxWidth: 400, maxHeight: 400 }}
                />
              );
            }
          })}
        </Flex>
      </div>
    );
  }
}