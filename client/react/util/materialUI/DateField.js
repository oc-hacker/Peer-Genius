import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import MuiSelectField from 'material-ui/SelectField';
import MuiRaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { verifyText } from './verifyField.js';

// SelectField menu items for month field
const months = [
	<MenuItem value={0} key={0} primaryText="Month" />,
	<MenuItem value={1} key={1} primaryText="Jan" />,
	<MenuItem value={2} key={2} primaryText="Feb" />,
	<MenuItem value={3} key={3} primaryText="Mar" />,
	<MenuItem value={4} key={4} primaryText="Apr" />,
	<MenuItem value={5} key={5} primaryText="May" />,
	<MenuItem value={6} key={6} primaryText="Jun" />,
	<MenuItem value={7} key={7} primaryText="Jul" />,
	<MenuItem value={8} key={8} primaryText="Aug" />,
	<MenuItem value={9} key={9} primaryText="Sep" />,
	<MenuItem value={10} key={10} primaryText="Oct" />,
	<MenuItem value={11} key={11} primaryText="Nov" />,
	<MenuItem value={12} key={12} primaryText="Dec" />
];

// SelectField menu items for days in a 31-day month
const days31 = [
	<MenuItem value={0} key={0} primaryText="Day" />,
	<MenuItem value={1} key={1} primaryText="1" />, 
	<MenuItem value={2} key={2} primaryText="2" />, 
	<MenuItem value={3} key={3} primaryText="3" />, 
	<MenuItem value={4} key={4} primaryText="4" />, 
	<MenuItem value={5} key={5} primaryText="5" />, 
	<MenuItem value={6} key={6} primaryText="6" />, 
	<MenuItem value={7} key={7} primaryText="7" />, 
	<MenuItem value={8} key={8} primaryText="8" />, 
	<MenuItem value={9} key={9} primaryText="9" />, 
	<MenuItem value={10} key={10} primaryText="10" />, 
	<MenuItem value={11} key={11} primaryText="11" />, 
	<MenuItem value={12} key={12} primaryText="12" />,
	<MenuItem value={13} key={13} primaryText="13" />,
	<MenuItem value={14} key={14} primaryText="14" />,
	<MenuItem value={15} key={15} primaryText="15" />,
	<MenuItem value={16} key={16} primaryText="16" />,
	<MenuItem value={17} key={17} primaryText="17" />,
	<MenuItem value={18} key={18} primaryText="18" />,
	<MenuItem value={19} key={19} primaryText="19" />,
	<MenuItem value={20} key={20} primaryText="20" />,
	<MenuItem value={21} key={21} primaryText="21" />,
	<MenuItem value={22} key={22} primaryText="22" />,
	<MenuItem value={23} key={23} primaryText="23" />,
	<MenuItem value={24} key={24} primaryText="24" />,
	<MenuItem value={25} key={25} primaryText="25" />,
	<MenuItem value={26} key={26} primaryText="26" />,
	<MenuItem value={27} key={27} primaryText="27" />,
	<MenuItem value={28} key={28} primaryText="28" />,
	<MenuItem value={29} key={29} primaryText="29" />,
	<MenuItem value={30} key={30} primaryText="30" />,
	<MenuItem value={31} key={31} primaryText="31" />
];

// SelectField menu items for days in a 30day month
const days30 = days31.slice(0, 31);
// SelectField menu items for days in a 29-day month
const days29 = days31.slice(0, 30);
// SelectField menu items for days in a 28-day month
const days28 = days31.slice(0, 29);

// Array of the number of days in each month
const monthToDays = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const style = {
	container: {
		display: 'flex'
	},
	button: {
		marginTop: '30px',
		marginLeft: '10px',
		marginRight: '5px'
	},
	text: {
		marginLeft: 20
	}
}

/**
 * @classdesc Wrapper component for Material UI TextFields.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			checkErrors: form.check,
			date: new Date(form[ownProps.varName]),
			err: form.err[ownProps.varName]
		};
	} else {
		return {
			checkErrors: false,
			date: null,
			err: ''
		}
	}
}, {
	sendFormVar
})
export default class DateField extends React.Component {
	static propTypes = {
		formName: PropTypes.string.isRequired,			// The name of the form in the Redux store.
		varName: PropTypes.string.isRequired,				// The name of the variable in the Redux store.
		floatingLabelText: PropTypes.string.isRequired,	// The label text floating above the field.
		underlineShow: PropTypes.bool,					// Whether to show an underline underneath the field (defaults to false).
		required: PropTypes.bool,							// Whether the field is required (defaults to true).
		onEnterPress: PropTypes.func.isRequired,			// The function to call on pressing enter.
		verifyFunc: PropTypes.func,						// The function used to verify the field (defauls to simply checking required).
		markRequired: PropTypes.bool.isRequired,			// Whether the field should be marked as required if it is.
		showErrors: PropTypes.bool,						// Whether to show errors (defaults to true).
		minAge: PropTypes.number.isRequired,
		maxAge: PropTypes.number.isRequired
	};

	static defaultProps = {
		underlineShow: true,
		required: true,
		showErrors: true,
		verifyFunc: verifyText
	};

	/** @class */
	constructor(props) {
		super(props);

		if (props.date.getDate()) {
			this.state = {
				month: props.date.getMonth() + 1,
				day: props.date.getDate(),
				year: props.date.getFullYear()
			};
		} else {
			this.state = {
				month: 0,
				day: 0,
				year: 0
			};
		}
	}

	componentWillReceiveProps = nextProps => {
		// If a form check is started, calculate errors.
		if (nextProps.checkErrors && !this.props.checkErrors) {
			this._onBlur(null, nextProps);
		}
	}

	/**
	 * Event handler for selecting a month.
	 * 
	 * @param {Object} [event]
	 * @param {Number} [index]
	 * @param {Any} [value]
	 */
	_onMonthChange = (event, index, value) => {
		if (this.state.day > monthToDays[value]) {
			this.setState({
				day: 0,
				month: value
			});
		} else {
			this.setState({
				month: value
			});
		}
	}

	/**
	 * Event handler for selecting a day.
	 * 
	 * @param {Object} [event]
	 * @param {Number} [index]
	 * @param {Any} [value]
	 */
	_onDayChange = (event, index, value) => {
		this.setState({
			day: value
		});
	}

	/**
	 * Event handler for selecting a year.
	 * 
	 * @param {Object} [event]
	 * @param {Number} [index]
	 * @param {Any} [value]
	 */
	_onYearChange = (event, index, value) => {
		if (this.state.month === 2 && this.state.day === 29 && !this._isLeapYear(value)) {
			this.setState({
				day: 0,
				year: value
			});
		} else {
			this.setState({
				year: value
			});
		}
	}

	/**
	 * Evaluates whether a year is a leap year.
	 * 
	 * @param  {Number} [year]
	 * @return {Boolean} Whether the year is a leap year
	 */
	_isLeapYear(year) {
		return (!!(year)) && !(year % 4) && ((!!(year % 100)) || !(year % 400));
	}

	/**
	 * Event handler for when the field loses focus.
	 *
	 * Calculates the error and updates the Redux store.
	 * 
	 * @param {Object} [event]
	 * @param {Object} [props] The props to use (defaults to this.props)
	 */
	_onBlur = (event, props=this.props) => {
		let newErr = '';
		let date = null;
		if (!this.state.month && !this.state.day && !this.state.year) {
			if (props.required) {
				newErr = 'This field is required.';
			}
		} else if (!(this.state.month && this.state.day && this.state.year)) {
			newErr = 'Invalid date.';
		} else {
			date = new Date(this.state.year, this.state.month - 1, this.state.day);
		}

		// Update the Redux store if anything changed.
		if (date !== props.date || newErr !== props.err) {
			props.sendFormVar(props.formName, props.varName, date, newErr);
		}
	}

	/**
	 * Event handler for when a key is pressed.
	 *
	 * Triggers onEnterPress if the key was the enter key.
	 * 
	 * @param {Object} [event]
	 */
	_onKeyPress = event => {
		if (event.key === 'Enter') {
			this.props.onEnterPress();
		}
	}

	/**
	 * @return {Array} The menu items for the day SelectField based on the current chosen month
	 */
	_getDays = () => {
		let numDays = monthToDays[this.state.month];
		if (numDays === 31) {
			return days31;
		} else if (this.state.month === 2) {
			if (this._isLeapYear(this.state.year)) {
				return days29;
			} else {
				return days28;
			}
		} else {
			return days30;
		}
	}

	/**
	 * Sets the fields to match the current date.
	 */
	_setToday = () => {
		let today = new Date();
		this.setState({
			month: today.getMonth() + 1,
			day: today.getDate(),
			year: today.getFullYear()
		});
	}

	render = () => {
		// Limit possible years
		let years = [<MenuItem value={0} key={0} primaryText="Year" />];
		let currYear = (new Date()).getFullYear();
		for (let a = this.props.minAge; a <= this.props.maxAge; a++) {
			let y = currYear - a;
			years.push(<MenuItem value={y} key={y} primaryText={y} />)
		}

		return (
			<div style={style.container}>
				<MuiSelectField
					value={this.state.month}
					hintText="Month"
					floatingLabelText={this.props.floatingLabelText + (this.props.required && this.props.markRequired ? '*' : '')}
					errorText={this.props.showErrors ? this.props.err : ''}
					underlineShow={this.props.underlineShow}
					labelStyle={style.text}
					floatingLabelStyle={style.text}
					errorStyle={style.text}
					onChange={this._onMonthChange}
					onBlur={this._onBlur}
					onKeyPress={this._onKeyPress}
				>{months}</MuiSelectField>
				<MuiSelectField
					value={this.state.day}
					hintText="Day"
					floatingLabelText=" "
					underlineShow={this.props.underlineShow}
					labelStyle={style.text}
					hintStyle={style.text}
					floatingLabelStyle={style.text}
					errorStyle={style.text}
					onChange={this._onDayChange}
					onBlur={this._onBlur}
					onKeyPress={this._onKeyPress}
				>{this._getDays()}</MuiSelectField>
				<MuiSelectField
					value={this.state.year}
					hintText="Year"
					floatingLabelText=" "
					underlineShow={this.props.underlineShow}
					labelStyle={style.text}
					hintStyle={style.text}
					floatingLabelStyle={style.text}
					errorStyle={style.text}
					onChange={this._onYearChange}
					onBlur={this._onBlur}
					onKeyPress={this._onKeyPress}
				>{years}</MuiSelectField>
				<div>
					{this.props.minAge <= 0 ? <MuiRaisedButton label="Today" secondary={true} onClick={this._setToday} style={style.button} /> : null}
				</div>
			</div>
		);
	}
}