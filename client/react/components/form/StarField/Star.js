import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { yellow } from 'material-ui/colors';
import StarIcon from 'material-ui-icons/Star';
import StarBorderIcon from 'material-ui-icons/StarBorder';

const styles = ({ spacing }) => ({
  icon: {
    color: yellow[700],
    cursor: 'pointer'
  }
});

@withStyles(styles)
export default class Star extends Component {
  static propTypes = {
    selected: PropTypes.bool,
  };

  render() {
    let { classes, selected, ...others } = this.props;

    return selected ? (
      <StarIcon
        className={classes.icon}
        {...others}
      />
    ) : (
      <StarBorderIcon
        className={classes.icon}
        {...others}
      />
    );
  }
}