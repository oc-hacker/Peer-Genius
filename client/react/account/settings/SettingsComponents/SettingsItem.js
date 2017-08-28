import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import SettingsIcon from 'material-ui-icons/Settings';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Flex } from '../../../components';

const styles = ({ palette: { primary } }) => ({
	root: {
		cursor: 'pointer'
	},
	text: {
		color: primary[500]
	}
});

@connect(null, { push })
@withStyles(styles)
export default class SettingsItem extends Component {
	static propTypes = {
		text: PropTypes.string,
		link: PropTypes.string
	};
	
	render() {
		let { classes, text, link, push } = this.props;
		
		return (
			<Flex
				className={classes.root}
				onClick={() => link && push(link)}
			>
				<SettingsIcon />
				<Typography className={classes.text}>{text}</Typography>
			</Flex>
		);
	}
}