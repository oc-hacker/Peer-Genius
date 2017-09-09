import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Flex from '../../Flex';
import Star from './Star';

class StarFieldComponent extends Component {
  static propTypes = {
    /** Number of stars available */
    maxValue: PropTypes.number,
  };

  static defaultProps = {
    maxValue: 5
  };

  constructor(props) {
    super(props);

    this.state = {
      // 0 = use input value, otherwise use state value
      value: 0
    };
  }

  _onLeaveField = () => {
    // Blur when the user's mouse leaves
    let { input: { value, onBlur } } = this.props;
    onBlur(value);
  };

  _onEnterStar = value => {
    this.setState({
      value
    });
  };

  _onLeaveStar = () => {
    this.setState({
      value: 0
    });
  };

  _onClickStar = value => {
    this.props.input.onChange(value);
  };

  render() {
    let {
      input, meta,
      maxValue,
      ...others
    } = this.props;

    // Map an array of stars to props
    let displayValue = this.state.value || input.value;
    let starsProps = new Array(maxValue).fill(null)
      .map((_, index) => ({
        selected: index < displayValue,
        onMouseEnter: () => this._onEnterStar(index + 1),
        onMouseLeave: () => this._onLeaveStar(),
        onClick: () => this._onClickStar(index + 1)
      }));

    return (
      <Flex
        align="center"
        onMouseLeave={this._onLeaveField}
        {...others}
      >
        {starsProps.map(props => (
          <Star {...props} />
        ))}
      </Flex>
    );
  }
}

export default class StarField extends Component {
  render() {
    return (
      <Field
        component={StarFieldComponent}
        {...this.props}
      />
    );
  }
}