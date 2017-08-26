import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import Menu, { MenuItem } from 'material-ui/Menu';

import { connect } from 'react-redux';

import Flex from '../Flex';
import HelperText from './HelperText';

// Maximum date counts
const dateCounts = [
	31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
];

const styles = ({ palette: { grey, error }, spacing }) => ({
	root: {
		borderWidth: 1,
		borderRadius: spacing.unit / 2,
		borderStyle: 'solid',
		borderColor: grey[300],
		boxSizing: 'border-box',
		
		fontSize: 'inherit',
	},
	errorRoot: {
		borderColor: error[500],
		boxShadow: `0 0 4px ${error[500]}`
	},
	warningRoot: {
		borderColor: orange[500],
		boxShadow: `0 0 4px ${orange[500]}`
	},
	segment: {
		cursor: 'pointer',
		padding: spacing.unit,
	},
	divider: {
		width: 1,
		margin: `${spacing.unit / 2}px 0`,
		backgroundColor: grey[300]
	}
});

@withStyles(styles)
class DateFieldComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
	};
	
	constructor(props) {
		super(props);
		
		this._monthInput = null;
		this._dateInput = null;
		this._yearInput = null;
		
		this.state = {
			anchor: null,
			open: '',
			months: [],
			dates: [],
			years: []
		};
	}
	
	_openMonth = () => {
		this.setState({
			anchor: this._monthInput,
			open: 'month'
		});
	};
	
	_openDate = () => {
		this.setState({
			anchor: this._dateInput,
			open: 'date'
		});
	};
	
	_openYear = () => {
		this.setState({
			anchor: this._yearInput,
			open: 'year'
		});
	};
	
	_close = () => {
		this.setState({
			open: ''
		});
	};
	
	_set = (name, value) => {
		let { input } = this.props;
		let newValue = {
			...input.value,
			[name]: value
		};
		
		if (typeof newValue.year === 'number' && typeof newValue.month === 'number' && typeof newValue.date === 'number') {
			// All fields have input, blur so that the field is marked as touched.
			input.onBlur(newValue);
		}
		else {
			input.onChange(newValue);
		}
		
		this._close();
	};
	
	_generateMonthArray = () => {
		this.setState({
			months: new Array(12).fill(null).map((_, index) => index)
		});
	};
	
	_generateDateArray = month => {
		this.setState({
			dates: new Array(dateCounts[typeof month === 'number' ? month : (this.props.input.value.month || 0)]).fill(null).map((_, index) => index + 1)
		});
	};
	
	_generateYearArray = () => {
		let { minDate, maxDate } = this.props;
		
		if (minDate > maxDate) {
			console.error(`Minimum date ${minDate} supplied to \`DateField\` is larger than maximum date ${maxDate}!`);
			return null;
		}
		let minYear = minDate.getFullYear();
		let maxYear = maxDate.getFullYear();
		
		this.setState({
			years: new Array(maxYear - minYear + 1).fill(null).map((_, index) => minYear + index)
		});
	};
	
	componentWillMount() {
		this._generateMonthArray();
		this._generateDateArray();
		this._generateYearArray();
	}
	
	componentWillReceiveProps(nextProps) {
		// Check if year array need to be regenerated
		if (nextProps.minDate !== this.props.minDate || nextProps.maxDate !== this.props.maxDate) {
			this._generateYearArray();
		}
		
		// Check if date array need to be regenerated
		if (nextProps.input.value.month !== this.props.input.value.month) {
			this._generateDateArray(nextProps.input.value.month);
		}
	}
	
	render() {
		let {
			input: { value: { month, date, year } }, meta, classes, className,
			minDate, maxDate,
			...others
		} = this.props;
		let {
			anchor, open,
			months, dates, years
		} = this.state;
		
		return (
			<Flex column>
				<Flex
					className={classNames(
						classes.root,
						{
							[classes.warningRoot]: meta.touched && meta.warning,
							[classes.errorRoot]: meta.touched && meta.error
						}
					)}
				>
					<Flex
						rootRef={self => this._monthInput = self}
						grow={1} justify="center" basis={0} className={classes.segment}
						onClick={this._openMonth}
					>
						{typeof month === 'number' ? month + 1 : 'MM'}
						<Menu
							anchorEl={anchor} style={{ width: this._monthInput ? this._monthInput.clientWidth : 0 }}
							open={open === 'month'} onRequestClose={this._close}
						>
							{typeof month !== 'number' ? (
								<MenuItem selected onClick={this._close}>
									MM
								</MenuItem>
							) : <div />}
							{months.map(m => (
								<MenuItem selected={m === month} onClick={() => this._set('month', m)}>
									{m + 1}
								</MenuItem>
							))}
						</Menu>
					</Flex>
					<div className={classes.divider} />
					<Flex
						rootRef={self => this._dateInput = self}
						grow={1} justify="center" basis={0} className={classes.segment}
						onClick={this._openDate}
					>
						{typeof date === 'number' ? date : 'DD'}
						<Menu
							anchorEl={anchor} style={{ width: this._dateInput ? this._dateInput.clientWidth : 0 }}
							open={open === 'date'} onRequestClose={this._close}
						>
							{typeof date !== 'number' ? (
								<MenuItem selected onClick={this._close}>
									DD
								</MenuItem>
							) : <div />}
							{dates.map(d => (
								<MenuItem selected={d === date} onClick={() => this._set('date', d)}>
									{d}
								</MenuItem>
							))}
						</Menu>
					</Flex>
					<div className={classes.divider} />
					<Flex
						rootRef={self => this._yearInput = self}
						grow={2} justify="center" basis={0} className={classes.segment}
						onClick={this._openYear}
					>
						{typeof year === 'number' ? year : 'YYYY'}
						<Menu
							anchorEl={anchor} style={{ width: this._yearInput ? this._yearInput.clientWidth : 0 }}
							open={open === 'year'} onRequestClose={this._close}
						>
							{typeof year !== 'number' ? (
								<MenuItem selected onClick={this._close}>
									YYYY
								</MenuItem>
							) : <div />}
							{years.map(y => (
								<MenuItem selected={y === year} onClick={() => this._set('year', y)}>
									{y}
								</MenuItem>
							))}
						</Menu>
					</Flex>
				</Flex>
				<HelperText error={meta.touched && meta.error} warning={meta.touched && meta.warning}/>
			</Flex>
		);
	}
}

export default class DateField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
	};
	
	static defaultProps = {
		minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 50)),
		maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 50))
	};
	
	_format = value => value || {};
	
	render() {
		return (
			<Field
				component={DateFieldComponent}
				format={this._format}
				{...this.props}
			/>
		);
	}
}