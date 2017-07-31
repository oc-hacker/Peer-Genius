import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Checkbox from 'material-ui/Checkbox';

import { connect } from 'react-redux';

const CheckboxField = props => {
	let { input: { name, checked, onChange }, meta, ...fieldProps } = props;
	
	// TODO error display
	return (<Checkbox
		name={name}
		checked={checked}
		onCheck={(event, checked) => onChange(checked)}
		{...fieldProps}
	/>);
};

/**
 * All props passed will be given to <code>Field</code> from <code>redux-forms</code>. Any props not used by <code>Field</code> will be passed to <code>Checkbox</code> from <code>material-ui</code>.
 */
const Check = props => (<Field
	component={CheckboxField}
	{...props}
/>);

export default Check;