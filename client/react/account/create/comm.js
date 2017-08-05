import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Field } from '../../components/form';

export default class Comm extends Component {
	static propTypes = {
		methods: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			checkLabel: PropTypes.string,
			textLabel: PropTypes.string
		}))
	};
	
	render() {
		let { methods, ...others } = this.props;
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
	}
}