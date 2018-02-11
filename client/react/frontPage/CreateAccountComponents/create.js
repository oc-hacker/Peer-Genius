import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isValid, SubmissionError, submit, touch } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import ClearIcon from 'material-ui-icons/Clear';

import { connect } from 'react-redux';

import { Button, Spacer, Text } from '../../components';
import { ReduxForm } from '../../components/form';
import InfoFields, { infoFieldNames } from './info';

import { post } from '../../../redux/actions/network';
import { createAccount } from '../../../redux/actions/creators/session';
import HonorCodeDialog from './honorCode';

const formName = 'createAccount';

const asyncValidate = async values => {
  let result = await post('/api/checkEmail', { email: values.email });
  let json = await result.json();

  if (json.taken) {
    // Email already taken, don't go to next page.
    throw new SubmissionError({
      email: 'This email is already associated with an account!'
    });
  }
};

const styles = ({ palette: { primary, error, getContrastText }, spacing }) => ({
  title: {
    backgroundColor: primary[500],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleText: {
    color: getContrastText(primary[500])
  },
  button: {
    width: spacing.unit * 4,
    height: spacing.unit * 4
  },
  cancel: {
    color: error[500],
    '&:hover': {
      backgroundColor: fade(error['A200'], 0.12),
    }
  }
});

@connect(state => ({
  valid: isValid(formName)(state)
}), {
  submit,
  touch,
  createAccount
})
@withStyles(styles)
export default class CreateAccountDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      honorCodeOpen: false
    };
  }

  _openHonorCode = () => {
    let { valid, touch } = this.props;

    // Check that the current form is valid first.
    if (!valid) {
      touch(formName, ...infoFieldNames);
    }
    else {
      this.setState({
        honorCodeOpen: true
      });
    }
  };

  _onAcceptHonorCode = () => {
    let { submit, onRequestClose } = this.props;
    this.setState({
      honorCodeOpen: false
    });
    submit(formName);
    onRequestClose();
  };

  _onDeclineHonorCode = () => {
    this.setState({
      honorCodeOpen: false
    });
    this.props.onRequestClose();
  };

  render() {
    let {
      classes, createAccount,
      open, onRequestClose
    } = this.props;

    return (
      <Dialog
        fullScreen transition={<Slide direction="up" />}
        open={open} onRequestClose={onRequestClose}
      >
        <DialogTitle disableTypography className={classes.title}>
          <Text type="title" className={classes.titleText}>
            Create Account
          </Text>
          <IconButton
            color="contrast" className={classes.button}
            onClick={onRequestClose}
          >
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ReduxForm
            form={formName} onSubmit={createAccount}
            asyncValidate={asyncValidate} asyncBlurFields={['email']}
          >
            <InfoFields />
          </ReduxForm>
        </DialogContent>
        <DialogActions>
          <Button
            color="danger"
            onClick={onRequestClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={this._openHonorCode}
          >
            Confirm
          </Button>
        </DialogActions>
        <HonorCodeDialog
          open={this.state.honorCodeOpen}
          onAccept={this._onAcceptHonorCode} onDecline={this._onDeclineHonorCode}
        />
      </Dialog>
    );
  }
}