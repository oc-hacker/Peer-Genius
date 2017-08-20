import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Flex } from '../../components/index';
import EditProfile from './edit';

const styles = ({ spacing }) => ({
	root: {
		width: '100%',
		// height: '100%',
		padding: spacing.unit * 2
	}
});

@withStyles(styles)
export default class Profile extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes } = this.props;
		
		return (
			<Flex justify="center" className={classes.root}>
				<Flex column>
					<EditProfile />
				</Flex>
			</Flex>
		);
	}
}