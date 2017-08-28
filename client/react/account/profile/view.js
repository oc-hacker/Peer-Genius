import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { connect } from 'react-redux';

import { Flex } from '../../components';
import { selectUser } from '../../../redux/selectors/user';

@connect(state => ({
	user: selectUser(state)
}))
export default class ViewProfile extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { user } = this.props;
		
		return (
			<Flex component={Paper} column grow={1} align="center">
				<Typography type="title">
					Your Profile
				</Typography>
			</Flex>
		);
	}
}