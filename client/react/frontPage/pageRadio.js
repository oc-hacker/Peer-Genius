import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { Radio } from './PageRadioComponents';

const styles = {
  group: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    transition: 'all 0.5s ease',
  },
  hidden: {
    opacity: 0,
    transitionDelay: '1.5s',
    '&:hover': {
      opacity: 1,
      transitionDelay: '0s'
    }
  },
  radio: {
    width: '0.8em',
    height: '0.8em',
    margin: '0.2em 0.1em'
  }
};

@withStyles(styles)
export default class PageRadio extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired
  };

  render() {
    let { classes, currentPage, setPage } = this.props;

    return (
      <div
        className={classNames({
          [classes.group]: true,
          [classes.hidden]: currentPage === 0
        })}
      >
        <Radio
          selected={currentPage === 0}
          firstPage={currentPage === 0}
          onClick={() => setPage(0)}
        />
        <Radio
          selected={currentPage === 1}
          firstPage={currentPage === 0}
          onClick={() => setPage(1)}
        />
        <Radio
          selected={currentPage === 2}
          firstPage={currentPage === 0}
          onClick={() => setPage(2)}
        />
        <Radio
          selected={currentPage === 3}
          firstPage={currentPage === 0}
          onClick={() => setPage(3)}
        />
        <Radio
          selected={currentPage === 4}
          firstPage={currentPage === 0}
          onClick={() => setPage(4)}
        />
      </div>
    );
  }
}