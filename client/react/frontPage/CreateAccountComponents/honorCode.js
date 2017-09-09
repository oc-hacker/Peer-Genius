import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import { Button } from '../../components';

export default class HonorCodeDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
  };

  render() {
    let { open, onAccept, onDecline } = this.props;

    return (
      <Dialog open={open}>
        <DialogTitle>
          Peer Genius Honor Code
        </DialogTitle>
        <DialogContent>
          Insert honor code here.
        </DialogContent>
        <DialogActions>
          <Button color="danger" onClick={onDecline}>
            Decline
          </Button>
          <Button color="primary" onClick={onAccept}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}