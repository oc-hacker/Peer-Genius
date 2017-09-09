import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel } from 'material-ui/Form';

export class CheckboxFieldComponent extends Component {
  render() {
    let {
      input: { value, ...input }, meta: { touched, error, warning },
      label, classes, ...fieldProps
    } = this.props;

    return (
      <FormControl error={touched && (error || warning)}>
        <FormControlLabel
          label={label}
          {...input}
          checked={Boolean(value)}
          {...fieldProps}
          control={<Checkbox />}
        />
      </FormControl>
    );
  }
}

export default class CheckboxField extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
  };

  render() {
    return (
      <Field
        component={CheckboxFieldComponent}
        {...this.props}
      />
    );
  }
}