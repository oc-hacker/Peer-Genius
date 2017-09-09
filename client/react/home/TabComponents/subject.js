import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { tab } from '../../components/tabs';

const styles = {
  root: {
    width: '100%',
    height: '100%'
  }
};

@tab('Subject')
@withStyles(styles)
export default class SubjectTab extends Component {
  render() {
    let { className, classes } = this.props;

    return (
      <div className={classNames(classes.root, className)}>
        Under Construction
      </div>
    );
  }
}