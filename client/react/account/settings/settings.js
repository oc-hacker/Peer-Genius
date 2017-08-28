import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import { Flex, Spacer } from '../../components/index';
import SettingsItem from './SettingsComponents/SettingsItem';
import EditSecurity from './security';
import EditCommunication from './communication';
import EditPassword from './SettingsComponents/password';

const styles = ({ palette: { primary, grey }, spacing }) => ({
	root: {
		boxSizing: 'border-box',
		padding: spacing.unit * 2
	},
	title: {
		color: primary[500]
	},
	heading: {
		textTransform: 'uppercase',
		margin: `${spacing.unit * 2}px 0`
	},
	headerUnderline: {
		width: '40%',
		marginRight: '60%',
		backgroundColor: grey[700],
	},
	divider: {
		height: 1,
		backgroundColor: grey[300],
		margin: `${spacing.unit * 2}px 0`
	}
});

@withStyles(styles)
export default class Settings extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes } = this.props;
		
		return (
			<Flex
				className={classes.root}
				justify="center" grow={1}
			>
				<Flex column basis="60%">
					<Typography type="title" className={classNames(classes.heading, classes.title)}>Setting</Typography>
					<div className={classNames(classes.divider, classes.headerUnderline)} />
					<Flex column>
						<Typography type="subheading" className={classes.heading}>Notifications</Typography>
						<Flex>
							<Flex column grow={1} basis={0}>
								<SettingsItem
									text="Push Notifications"
								/>
								<SettingsItem
									text="Text Message Notifications"
								/>
							</Flex>
							<Flex column grow={1} basis={0}>
								<SettingsItem
									text="Email Settings"
								/>
								<SettingsItem
									text="Phone Preferences"
								/>
							</Flex>
						</Flex>
					</Flex>
					<div className={classes.divider} />
					<Flex column>
						<Typography type="subheading" className={classes.heading}>Privacy</Typography>
						<Flex>
							<SettingsItem
								text="Social"
							/>
						</Flex>
					</Flex>
					<div className={classes.divider} />
					<Flex column>
						<Typography type="subheading" className={classes.heading}>Security</Typography>
						<EditPassword />
					</Flex>
				</Flex>
			</Flex>
		);
	}
}