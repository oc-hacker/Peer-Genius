import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent} from 'material-ui/Dialog';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(null, { push })
export default class ReviewSession extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { push } = this.props;

    return (
      <Dialog
        open onRequestClose={() => push('')}
      >
        <DialogTitle>
          Review Session
        </DialogTitle>
        <DialogContent>
          Page under construction.
        </DialogContent>
      </Dialog>
    );
  }
}