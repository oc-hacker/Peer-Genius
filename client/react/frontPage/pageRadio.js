import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';

import { connect } from 'react-redux';

const styles = {
	group: {
		position: 'absolute',
		left: 0,
		top: 0,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		
		transition: 'all 0.5s ease',
	},
	hidden: {
		opacity: 0,
		transitionDelay: '1.5s',
		'&:hover': {
			opacity: 1,
			transitionDelay: '0s'
		}
	},
	radio: {
		width: '0.8em',
		height: '0.8em',
		margin: '0.2em 0.1em'
	}
};

@withStyles(styles)
export default class PageRadio extends Component {
	static propTypes = {
		currentPage: PropTypes.number.isRequired,
		setPage: PropTypes.func.isRequired
	};
	
	_setPage = (event, value) => {
		this.props.setPage(parseInt(value));
	};
	
	render() {
		let { classes, currentPage } = this.props;
		
		return (
			<RadioGroup
				className={classNames({
					[classes.group]: true,
					[classes.hidden]: currentPage === 0
				})}
				selectedValue={currentPage}
				onChange={this._setPage}
			>
				<Radio value={0} className={classes.radio} />
				<Radio value={1} className={classes.radio} />
				<Radio value={2} className={classes.radio} />
				<Radio value={3} className={classes.radio} />
				<Radio value={4} className={classes.radio} />
			</RadioGroup>
		);
	}
}