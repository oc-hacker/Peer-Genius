import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Field } from '../../components/form';
import { serverURL } from '../../../config';

export default class Comm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			methods: [],
			error: false
		};
	}
	
	async componentWillMount() {
		try {
			let response = await fetch(serverURL + '/loc/comms.json');
			let json = await response.json();
			
			let methods = [];
			for (let key in json) {
				methods.push({
					name: key,
					checkLabel: json[key],
					textLabel: key === 'imessage' ? 'Phone number' : 'Username' // TODO a better way?
				});
			}
			this.setState({ methods });
		}
		catch (error) {
			this.setState({ error: true });
		}
	}
	
	render() {
		let { methods, error } = this.state;
		
		if (error) {
			return <div style={{ color: 'red', ...this.props.style }}>
				Unexpected error when contacting server. Please try again later.
				<br />
				If this problem persists, please contact a developer.
			</div>;
		}
		
		return (
			<div {...this.props}>
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