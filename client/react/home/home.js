import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import { Flex } from '../components';

const styles = ({ typography: { title } }) => ({
	root: {
		width: '100%'
	},
	motto: {
		fontSize: title.fontSize * 1.5,
		textAlign: 'center'
	}
});

@withStyles(styles)
export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes } = this.props;
		
		return (
			<Flex
				column align="center" justify="center" grow={1}
				className={classes.root}
			>
				<Typography type="title" classes={{ title: classes.motto }}>ELIMINATE the<br />GRIND</Typography>
			</Flex>
		);
	}
}