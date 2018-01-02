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
    timeout: PropTypes.number, // Amount of time to wait before indicating that the user is inactive
  
    isClosed: PropTypes.bool // is the chat session ended or still ongoing
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

    if (this.props.isClosed) return;

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

  _toggleWebcam = () => {
    if (this.props.isClosed) {
      this.setState({ webcam: false });
      return;
    }
    this.setState({ webcam: !this.state.webcam });
  }

  getBase64Image(img) {
    var canvas = document.createElement('canvas');

    let image = new Image();
    image.src = img;
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  _sendImage = () => {
    let imgStr = this.webcam.getScreenshot();
    this.props.sendImage(imgStr);
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  render() {
    let {
      classes, value,
      onTypeStart, onTypeEnd, onChange, onSubmit, delay, timeout,
      ...others
    } = this.props;


    if (this.state.webcam) {
      return (
        <div>
          <Flex justify="center">
            <Webcam
              audio={false}
              height={500}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={500}
            />
          </Flex>
          <Flex justify="center" style={{ widht: '100%', paddingBottom: 10 }}>
            <Button
              round raised color="primary"
              onClick={this._sendImage}
            >
              Send
            </Button>
            <Button
              round color='primary'
              onClick={this._toggleWebcam}
            >
              Close
            </Button>
          </Flex>
        </div>
      );
    }

    return (
      <Flex
        className={classes.root}
        grow={1}
      >
        <Button
          round color={this.props.isClosed ? 'grey' : 'primary'}
          onClick={this._toggleWebcam}
        >
          <span
            role="img"
            aria-label="Webcam"
            style={{ fontSize: 'x-large' }}
          >
            📷
          </span>
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
          round raised color={this.props.isClosed ? 'grey' : 'primary'}
          className={classes.sendButton}
          onClick={this._submit}
        >
          Send
        </Button>
      </Flex>
    );
  }
}