import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Checkbox from 'material-ui/Checkbox';

import { connect } from 'react-redux';

const CheckboxComponent = props => {
	let { input: { name, value, onChange }, meta, ...fieldProps } = props;
	
	// TODO error display
	return (<Checkbox
		name={name}
		checked={Boolean(value)}
		onCheck={(event, checked) => onChange(checked)}
		{...fieldProps}
	/>);
};

/**
 * All props passed will be given to <code>Field</code> from <code>redux-forms</code>. Any props not used by <code>Field</code> will be passed to <code>Checkbox</code> from <code>material-ui</code>.
 */
const Check = props => (<Field
	component={CheckboxComponent}
	{...props}
/>);

Check.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string
};

export default Check;