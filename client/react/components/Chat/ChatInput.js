import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import debounce from 'lodash/debounce';

import Button from '../Button';
import StyledInput from '../StyledInput';

const styles = {
  input: {
    position: 'relative'
  },
  sendButton: {
    position: 'absolute',
    right: 0,
    bottom: 0
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
      // Enter key pressed, submit
      this._submit();
    }
  };

  _submit = () => {
    this.props.onSubmit();
    // Immediately trigger onTypeEnd with submitted=true to indicate a submit.
    this._onTypeEnd.flush();
  };

  render() {
    let { classes, value, onTypeStart, onTypeEnd, onChange, onSubmit, ...others } = this.props;

    return (
      <StyledInput
        Component={'div'}
        contentEditable
        className={classes.input}
        onChange={this._onChange}
        onKeyPress={this._onKeyPress}
        {...others}
      >
        {value}
        <Button
          raised color="primary"
          className={classes.sendButton}
          onClick={this._submit}
        >
          Send
        </Button>
      </StyledInput>
    );
  }
}