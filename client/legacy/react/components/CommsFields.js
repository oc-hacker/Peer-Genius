import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Field } from './form';

const CommsFields = connect(state => ({
	methods: state.commMethods
}))(props => {
	let { methods, ...others } = props;
	return (
		<div {...others}>
			{methods.map(method => (
				<Field.CheckText
					key={method.name}
					{...method}
					checkStyle={{ minWidth: '11em' }}
				/>
			))}
		</div>
	);
});

CommsFields.propTypes = {
	methods: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		checkLabel: PropTypes.string.isRequired,
		textLabel: PropTypes.string.isRequired
	}))
};

export default CommsFields;