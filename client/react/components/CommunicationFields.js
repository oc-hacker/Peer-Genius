import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { CheckTextField } from './form';

import { selectCommunicationMethods } from '../../redux/selectors/config';

const styles = {
  checkbox: {
    minWidth: '12em'
  }
};

@connect(state => ({
  methods: selectCommunicationMethods(state)
}))
@withStyles(styles)
export default class CommunicationFields extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    let { className, classes, methods } = this.props;

    return (
      <div>
        {Object.keys(methods).map(methodName => (
          <CheckTextField
            key={methodName}
            name={methodName}
            checkLabel={methods[methodName]}
            textLabel={methodName === 'imessage' ? 'Phone number' : 'Username'}
            checkboxProps={{ className: classes.checkbox }}
          />
        ))}
      </div>
    );
  }
}