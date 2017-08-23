import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';

import { connect } from 'react-redux';

import { selectSubjects } from '../../redux/selectors/config';

const decamelize = camelCaseWord =>
	camelCaseWord
		.split('')
		.map((char, index) => {
			if (index === 0) {
				return char.toUpperCase();
			}
			else {
				return char.toUpperCase() === char ? ` ${char}` : char;
			}
		})
		.join('');

@connect(state => ({
	subjects: selectSubjects(state)
}))
export default class SubjectFields extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { subjects } = this.props;
		
		return (
			<List>
				{Object.keys(subjects).map(category => {
					// Revert camelCase to labels
					let categoryLabel = decamelize(category);
					
					return (
						<ListItem key={category}>
							<ListItemText primary={categoryLabel} />
							<List>
								{Object.keys(subjects[category]).map(subject => (
									<ListItem>
										<ListItemText primary={subjects[category][subject]} />
									</ListItem>
								))}
							</List>
						</ListItem>
					);
				})}
			</List>
		);
	}
}