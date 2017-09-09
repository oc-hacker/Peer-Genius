import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import Button from './Button';

import { connect } from 'react-redux';
import { selectDevMode } from '../../redux/selectors/config';
import { selectShowUnexpectedErrorDialog } from '../../redux/selectors/dialog';
import { closeUnexpectedError, ignoreUnexpectedError } from '../../redux/actions/creators/dialog';

const styles = ({ palette: { error, getContrastText }, spacing }) => ({
  error: {
    backgroundColor: error[500],
    color: getContrastText(error[500])
  },
  danger: {
    color: error[500],
    '&:hover': {
      backgroundColor: fade(error['A200'], 0.12),
    }
  },
  content: {
    padding: spacing.unit * 3
  }
});

@connect(state => ({
  show: selectShowUnexpectedErrorDialog(state),
  devMode: selectDevMode(state)
}), {
  closeUnexpectedError,
  ignoreUnexpectedError
})
@withStyles(styles)
export default class UnexpectedErrorDialog extends Component {
  render() {
    let {
      show, devMode,
      closeUnexpectedError, ignoreUnexpectedError,
      classes
    } = this.props;

    // TODO is the github URL correct?
    return (
      <Dialog open={show}>
        <DialogTitle className={classes.error}>
          Oops!
        </DialogTitle>
        <DialogContent className={classes.content}>
          We have encountered an unexpected error when contacting the server.
          <br />
          Please try refreshing the page, or access Peer Genius at a later time.
          <br />
          If this problem persists, please contact a developer by creating an issue at
          <a href="https://github.com/Peer-Genius/Peer-Genius">Our GitHub Repository</a>.
        </DialogContent>
        <DialogActions>
          {devMode && <Button className={classes.danger} onClick={ignoreUnexpectedError}>
            Ignore Errors Like This (DEV MODE ONLY)
          </Button>}
          <Button color="primary" onClick={closeUnexpectedError}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}