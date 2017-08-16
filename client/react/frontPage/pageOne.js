import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

const styles = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		height: '100%'
	}
};

@withStyles(styles)
export default class PageOne extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { classes } = this.props;
		
		return (
			<div className={classes.page}>
				<Typography type="title">Peer Genius</Typography>
				<Typography type="subheading">Eliminate the Grind</Typography>
				
			</div>
		);
	}
}