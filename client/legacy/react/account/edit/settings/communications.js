import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { connect } from 'react-redux';

import CommsFields from '../../../components/CommsFields';
import { StyledForm } from '../../../components/form';
import { FormToolbar } from '../../../components/form/utils';
import { updateComms } from '../../../../redux/actions/communication';

@connect(state => ({
	defaultValues: state.comms
}))
@reduxForm({
	form: 'editCommunication',
	onSubmit: (values, dispatch) => {
		dispatch(updateComms(values));
	}
})
export default class Communications extends PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			methods: []
		};
	}
	
	async componentWillMount() {
		try {
			let response = await get('/loc/comms.json');
			let json = await response.json();
			
			let methods = [];
			for (let key in json) {
				// noinspection JSUnfilteredForInLoop
				methods.push({
					name: key,
					checkLabel: json[key],
					textLabel: key === 'imessage' ? 'Phone number' : 'Username' // TODO a better way?
				});
			}
			this.setState({ methods });
		}
		catch (error) {
			console.error('Error when fetching methods:', error);
		}
	}
	
	render() {
		return (
			<StyledForm>
				<h2>Communication Preferences</h2>
				<CommsFields />
				<FormToolbar reset={this.props.reset} />
			</StyledForm>
		);
	}
}