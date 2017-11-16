import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import debounce from 'lodash.debounce';

import Button from '../../Button';
import StyledInput from '../../StyledInput';
import Flex from '../../Flex';

const styles = {
  root: {
    position: 'relative'
  },
  input: {
    flexGrow: 1,
    margin: 10
  },
  sendButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    padding: 0,
    minWidth: 64,
    minHeight: 20
  }
};

@withStyles(styles)
export default class ChatInput extends Component {
  static propTypes = {
    // Controlled component
    value: PropTypes.string,
    onChange: PropTypes.func, // Called with the new value, not the event
    onSubmit: PropTypes.func,
    // User status indicator
    onTypeStart: PropTypes.func,
    onTypeEnd: PropTypes.func,
    // Debounce setting
    delay: PropTypes.number, // Amount of time to wait before indicating that the user stopped typing
    timeout: PropTypes.number // Amount of time to wait before indicating that the user is inactive
  };

  static defaultProps = {
    delay: 5000,
    timeout: 5 * 60 * 1000
  };

  constructor(props) {
    super(props);

    this.state = {
      autoSubmit: true
    };
  }

  _onTypeStart = debounce(
    this.props.onTypeStart,
    this.props.delay,
    { leading: true, trailing: false }
  );

  _onTypeEnd = debounce(
    this.props.onTypeEnd,
    this.props.delay,
    { leading: false, trailing: true }
  );

  _onChange = event => {
    this._onTypeStart();
    this.props.onChange(event.target.value);
    this._onTypeEnd();
  };

  _onKeyPress = event => {
    if (event.key === 'Enter') {
      // Slightly hacky XOR
      if (!this.state.autoSubmit !== !event.shiftKey) {
        // Enter key pressed, submit
        this._submit();
        event.preventDefault();
      }
    }
  };

  _submit = () => {
    this.props.onSubmit();
    // Immediately trigger onTypeEnd
    this._onTypeEnd.flush();
  };

  render() {
    let {
      classes, value,
      onTypeStart, onTypeEnd, onChange, onSubmit, delay, timeout,
      ...others
    } = this.props;

    return (
      <Flex className={classes.root}>
        <StyledInput
          Component={'textarea'}
          className={classes.input}
          value={value}
          onChange={this._onChange}
          onKeyDown={this._onKeyPress}
          {...others}
        >
        </StyledInput>
        <Button
          round raised color="primary"
          className={classes.sendButton}
          onClick={this._submit}
        >
          Send
        </Button>
      </Flex>
    );
  }
}