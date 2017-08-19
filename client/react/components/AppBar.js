import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Flex from './Flex';
import Spacer from './Spacer';
import AccountMenu from './AppBarComponents/AccountMenu';
import AboutUs from './AppBarComponents/AboutUs';
import GuruMenu from './AppBarComponents/GuruMenu';

const styles = ({ palette: { primary, getContrastText }, spacing }) => ({
	appBar: {
		display: 'flex',
		boxSizing: 'border-box',
		padding: `${spacing.unit}px ${spacing.unit * 2}px`,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	logo: {
		width: 40,
		height: '100%',
		cursor: 'pointer'
	},
	appBarText: {
		color: getContrastText(primary[500]),
		padding: spacing.unit,
		cursor: 'default'
	},
	appBarButton: {
		width: '5em'
	}
});

@connect(null, { push })
@withStyles(styles)
export default class CustomAppBar extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			currentMenu: null
		};
	}
	
	
	render() {
		let { classes, push } = this.props;
		
		return (
			<AppBar className={classes.appBar}>
				<Flex align="center">
					<img
						src="/logo.svg"
						className={classes.logo}
						onClick={() => push('/home')}
					/>
					<Typography type="title" className={classes.appBarText}>Peer Genius</Typography>
				</Flex>
				<Flex align="center">
					<GuruMenu />
					<AboutUs />
					<AccountMenu />
				</Flex>
			</AppBar>
		);
	}
}