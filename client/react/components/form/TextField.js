import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import FieldControl from './FieldControl';
import StyledLabel from './StyledLabel';
import StyledInput from '../StyledInput';
import HelperText from './HelperText';

const styles = {
  placeholder: {
    color: 'rgba(0,0,0,0.5)'
  }
};

@withStyles(styles)
class TextFieldClass extends React.Component {
  render = () => {
    let {
      input, meta,
      label, placeholder, type,
      className, classes,
      inputClass, labelClass, labelWidth,
      multiline
    } = this.props;

    let inputProps = {
      ...input,
      type,
      placeholder,
      className: inputClass
    };
    if (multiline) {
      inputProps.Component = 'div';
      inputProps.contentEditable = true;
      if (input.value) {
        inputProps.children = [
          input.value
        ];
      }
      else if (!meta.active && (placeholder || label)) {
        inputProps.children = [
          placeholder || label
        ];
        inputProps.className = classNames(
          {
            [classes.placeholder]: true
          },
          inputClass
        );
      }
    }

    return (
      <FieldControl
        className={className}
        error={meta.touched && meta.error}
        warning={meta.touched && meta.warning}
      >
        {
          label && (
            <StyledLabel
              htmlFor={input.name}
              width={labelWidth}
              className={labelClass}
            >
              {label}
            </StyledLabel>
          )
        }
        <StyledInput
          {...inputProps}
        />
        <HelperText />
      </FieldControl>
    );
  };
}

const TextField = props => (
  <Field
    component={TextFieldClass}
    {...props}
  />
);

TextField.displayName = 'TextField';

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  multiline: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextField;
