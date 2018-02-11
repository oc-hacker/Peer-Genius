import React, { Component } from 'react';
import classNames from 'classnames';
import stylesheet from 'react-jss';
import MuiPaper from 'material-ui/Paper';

const styles = {
  paper: {
    padding: props => props.padding || 8
  }
};

@stylesheet(styles)
export default class Paper extends Component {
  render() {
    let {
      className, classes: { paper, ...classes },
      sheet, padding, rounded,
      ...paperProps
    } = this.props;


    return (
      <MuiPaper
        className={classNames(paper, className)}
        classes={classes}
        square={!rounded}
        {...paperProps}
      />
    );
  }
}