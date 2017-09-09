import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';

const styles = {
  spacer: {
    width: props => props.width || '100%',
    height: props => props.height || '100%',
    flexGrow: props => props.grow || 0,
    backgroundColor: 'transparent'
  }
};

@stylesheet(styles)
export default class Spacer extends PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    grow: PropTypes.number
  };

  render() {
    return (
      <div className={this.props.classes.spacer} />
    );
  }
}