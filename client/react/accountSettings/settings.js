import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles, withTheme } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Flex, Spacer } from '../components';
import EditSecurity from './security';
import EditCommunication from './communication';

const styles = ({ spacing }) => ({
	root: {
		width: '100%',
		// height: '100%',
		boxSizing: 'border-box',
		padding: spacing.unit * 2
	}
});

@withStyles(styles)
@withTheme
export default class Settings extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes, theme } = this.props;
		
		return (
			<Flex justify="center" className={classes.root}>
				<Flex column>
					<EditSecurity />
					<Spacer height={theme.spacing.unit * 2} />
					<EditCommunication />
				</Flex>
			</Flex>
		);
	}
}