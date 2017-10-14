import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DateField, TextField } from '../../components/form/index';

import { email, range, required, same } from '../../components/form/validator';

export const infoFieldNames = [
  'firstName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPassword', 'birthdate'
];

export default class InfoFields extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let minDate = new Date(), maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 19);
    maxDate.setFullYear(maxDate.getFullYear() - 13);

    const labelWidth = '10em';

    return (
      <div {...this.props}>
        <br />
        <TextField
          type="text"
          name="firstName"
          label="First Name"
          labelWidth={labelWidth}
          validate={[required`You have a name, right?`]}
        />
        <TextField
          type="text"
          name="lastName"
          label="Last Name"
          labelWidth={labelWidth}
          validate={[required`You have a name, right?`]}
        />
        <TextField
          name="email"
          label="Email"
          labelWidth={labelWidth}
          validate={[required`You must have an email address.`]}
          warn={[email`'${value => value}' does not look like an email address.`]}
        />
        <TextField
          type="email"
          name="confirmEmail"
          label="Confirm Email"
          labelWidth={labelWidth}
          validate={[same('email')`'${value => value}' does not match '${(value, all) => all.email}'.`]}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          labelWidth={labelWidth}
          validate={[required`Please set a password.`]}
        />
        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          labelWidth={labelWidth}
          validate={[same('password')`Passwords do not match.`]}
        />
        <DateField
          name="birthdate"
          label="Date of Birth"
          labelWidth={labelWidth}
          defaultMode="year"
          minDate={new Date(minDate.getFullYear() - 1, minDate.getMonth(), minDate.getDate())}
          maxDate={new Date(maxDate.getFullYear() + 1, maxDate.getMonth(), maxDate.getDate())}
          validate={[required`When were you born?`]}
          warn={[range(minDate, maxDate, [true, true], (value, bound) => {
            if (value) {
              return new Date(value).getTime() - bound;
            }
            else {
              return false;
            }
          })`You must be between 13 years and 18 years of age to participate at Peer Genius.`]}
        />
      </div>
    );
  }
}
