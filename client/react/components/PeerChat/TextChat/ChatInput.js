import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import debounce from 'lodash.debounce';

import Button from '../../Button';
import StyledInput from '../../StyledInput';
import Flex from '../../Flex';

import Webcam from 'react-webcam';

const styles = {
  root: {
    position: 'relative',
    minHeight: '6em'
  },
  input: {
    flexGrow: 1,
    margin: 10,
    overflow: 'hidden',
    resize: 'none',
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
      autoSubmit: true,
      webcam: false
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
    event.persist();

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

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  _sendImage = () => {
    let imgSrc = this.webcam.getScreenshot();
    let imgStr = this.getBase64Image(imgSrc);
    this.props.sendImage(imgStr);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  render() {
    let {
      classes, value,
      onTypeStart, onTypeEnd, onChange, onSubmit, delay, timeout,
      ...others
    } = this.props;


    if (this.state.webcam) {
      return (
        <div>
          <Webcam
            audio={false}
            height={500}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={500}
          />
          <div style={{display: 'inline'}}>
            <Button
              round raised color="primary"
              onClick={this._sendImage}
            >
              Send
            </Button>
            <Button
              round color='primary'
              onClick={() => this.setState({webcam: false})}
            >
            Close
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Flex
        className={classes.root}
        grow={1}
      >
        <Button
          round color="primary"
          onClick={() => this.setState({webcam: true})}
        >
        📷
        </Button>
        <StyledInput
          Component={'textarea'}
          className={classes.input}
          value={value}
          onChange={this._onChange}
          onKeyDown={this._onKeyPress}
          {...others}
        />
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