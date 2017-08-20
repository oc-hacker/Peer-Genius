import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import { Flex, Paper, CommunicationFields } from '../components';
import { ReduxForm } from '../components/form';

import { selectCommunication } from '../../redux/selectors/communication';
import { editCommunication } from '../../redux/actions/creators/communication';

@connect(state => ({
	communication: selectCommunication(state)
}), {
	editCommunication
})
export default class EditCommunication extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { communication, editCommunication } = this.props;
		
		return (
			<Paper>
				<Typography type="title">Communications</Typography>
				<ReduxForm
					form="editCommunication" onSubmit={editCommunication}
					initialValues={communication}
				>
					<CommunicationFields />
					<Flex direction="row-reverse">
						<Button
							raised color="primary"
							type="submit"
						>
							Confirm
						</Button>
					</Flex>
				</ReduxForm>
			</Paper>
		);
	}
}