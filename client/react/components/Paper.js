import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import stylesheet from 'react-jss';

import { withStyles } from 'material-ui/styles';
import MuiPaper from 'material-ui/Paper';

import { connect } from 'react-redux';

const styles = {
	paper: {
		padding: props => props.padding || 8
	}
};

@stylesheet(styles)
export default class Paper extends Component {
	render() {
		let {
			className, classes: { paper, ...classes },
			sheet, padding, rounded,
			...paperProps
		} = this.props;
		
		
		return (
			<MuiPaper
				className={classNames(paper, className)}
				classes={classes}
				square={!rounded}
				{...paperProps}
			/>
		);
	}
}