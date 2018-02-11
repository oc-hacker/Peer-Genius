import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  page: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
    top: 0,
    transition: 'all 1s ease'
  },
  next: {
    top: '100%'
  }
};

@withStyles(styles)
export default class Page extends Component {
  static propTypes = {
    className: PropTypes.string,
    bg: PropTypes.string,
    page: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  };

  render() {
    const { className, classes, page, currentPage, bg, ...divProps } = this.props;

    return (
      <div
        className={classNames({
          [classes.page]: true,
          [classes.next]: currentPage < page
        }, className)}
        {...divProps}
      />
    );
  }
}