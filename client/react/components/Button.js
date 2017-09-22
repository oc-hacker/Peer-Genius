import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';
import classNames from 'classnames';

import { withTheme } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import Button from 'material-ui/Button';

const getColor = (props, shade = 500) => {
  let { theme: { palette }, color } = props;
  if (color in palette) {
    return palette[color][shade];
  }
  else {
    return color;
  }
};

const getContrastColor = (props, shade) => {
  let { theme: { palette } } = props;
  return palette.getContrastText(getColor(props));
};

const styles = {
  root: {
    cursor: 'pointer',
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none'
    },
    borderRadius: props => props.round && 'calc(100vw + 100vh)'
  },
  round: {
  },
  flat: {
    color: props => getColor(props),
    border: props => props.border ? `1px solid ${getColor(props)}` : null,
    '&:hover': {
      backgroundColor: props => fade(getColor(props, 'A200'), 0.12)
    }
  },
  raised: {
    backgroundColor: props => getColor(props),
    color: props => getContrastColor(props),

    '&:hover': {
      backgroundColor: props => getColor(props, 700),
      color: props => getContrastColor(props, 700),
    }
  }
};

@withTheme
@stylesheet(styles)
export default class CustomButton extends Component {
  static propTypes = {
    /** Can be one of MUI's theme colors, or a css color string */
    color: PropTypes.string,
    round: PropTypes.bool,
  };

  render() {
    let {
      classes, className,
      theme, sheet, color, round,
      ...others
    } = this.props;
    let raised = this.props.raised || this.props.fab;

    return (
      <Button
        className={classNames(
          classes.root,
          {
            [classes.flat]: !raised,
            [classes.raised]: raised
          },
          className
        )}
        {...others}
      />
    );
  }
}