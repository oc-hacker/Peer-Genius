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
          As a user of Peer Genius, I adhere to the principles of truth, integrity, and respect.
          I will not lie, cheat, or take photos or video record without the other person’s consent.
          I am held accountable for the sessions I commit to; regardless whether I am the Newbee or the Guru.
          I will respect other’s opinions, space, and personal information at all times.
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