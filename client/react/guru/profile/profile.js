/* eslint-disable */
// TODO Not done yet!
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

export default class GuruProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { match: { params } } = this.props;

    return (
      <div>
        Page Under Construction
      </div>
    );
  }
}