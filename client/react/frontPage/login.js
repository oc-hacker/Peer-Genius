import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';

import { connect } from 'react-redux';

import { Button } from '../components';
import { ReduxForm, TextField } from '../components/form';

import { logIn } from '../../redux/actions/creators/session';

const styles = ({ palette: { danger, getContrastText } }) => ({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }
});

@connect(null, { logIn })
@withStyles(styles)
export default class LoginDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired
  };

  render() {
    let { classes, open, onRequestClose, logIn } = this.props;

    const labelWidth = '5em';

    return (
      <Dialog open={open} onRequestClose={onRequestClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <ReduxForm form="logIn" onSubmit={logIn}>
            <TextField
              name="email" label="Email" labelWidth={labelWidth}
            />
            <TextField
              name="password" type="password" label="Password" labelWidth={labelWidth}
            />
            <div className={classes.buttons}>
              <Button
                raised color="danger"
                onClick={onRequestClose}
              >
                Cancel
              </Button>
              <Button
                raised color="primary"
                type="submit"
              >
                Log In
              </Button>
            </div>
          </ReduxForm>
        </DialogContent>
      </Dialog>
    );
  }
}