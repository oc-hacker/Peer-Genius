import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import { connect } from 'react-redux';


import { selectSubjects } from '../../redux/selectors/config';

@connect(state => ({
	subjects: selectSubjects(state)
}))
export default class SubjectFields extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { subjects } = this.props;
		
		
	}
}