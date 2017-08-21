import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import { Flex } from '../components';
import TabTitles from './tabTitles';

const styles = ({ typography: { title }, palette: { primary, accent, getContrastText }, spacing }) => ({
	root: {
		width: '100%'
	},
	motto: {
		fontSize: title.fontSize * 1.5,
		textAlign: 'center'
	},
});

@withStyles(styles)
export default class Home extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			tabIndex: 0
		};
	}
	
	_setTab = index => {
		this.setState({
			tabIndex: index
		});
	};
	
	render() {
		let { classes } = this.props;
		let { tabIndex } = this.state;
		
		return (
			<Flex
				column align="center" justify="center" grow={1}
				className={classes.root}
			>
				<Typography type="title" classes={{ title: classes.motto }}>ELIMINATE the<br />GRIND</Typography>
				<TabTitles tabIndex={tabIndex} setTab={this._setTab} />
			</Flex>
		);
	}
}