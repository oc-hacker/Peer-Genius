import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { tab } from '../../components/tabs';

const styles = {
	root: {
		width: '100%',
		height: '100%'
	}
};

@tab('Subject')
@withStyles(styles)
export default class SubjectTab extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { className, classes } = this.props;
		
		return (
			<div className={classNames(classes.root, className)}>
				Under Construction
			</div>
		);
	}
}