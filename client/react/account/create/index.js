import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, FormSection, reduxForm, formValueSelector, startAsyncValidation, stopAsyncValidation, submit, touch } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';

import stylesheet from 'react-jss';

import InfoPage from './info';
import CommPage from './comm';
import HonorCode from './honorCode';

import { createAccount } from '../../../redux/actions/account.js';
import { get, post } from '../../../reference/api';
import { serverURL } from '../../../config';

const transitionLength = 1;
const styles = {
	wrapper: {
		width: '100%',
		height: '100%',
		padding: '4em',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		transition: 'all 0.3s ease',
		animationDelay: `${transitionLength}s`
	},
	widthContainer: {
		position: 'relative',
		width: '80%',
		maxWidth: '30em',
		flexGrow: 1,
		overflowX: 'hidden',
	},
	buttonRow: {
		position: 'absolute',
		width: '100%',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		transition: `all ${transitionLength / 2}s ease`
	}
};

const offsetPercent = 110;

const form = 'createAccount';

@reduxForm({
	form,
	onSubmit: async (values, dispatch) => {
		await dispatch(createAccount(values));
	},
	asyncBlurFields: ['email'],
	asyncValidate: async values => {
		let result = await post('/api/checkEmail', { email: values.email });
		let json = await result.json();
		
		if (json.taken) {
			// Email already taken, don't go to next page.
			throw {
				email: 'This email is already associated with an account!'
			};
		}
	}
})
@connect(null, dispatch => ({
	pushToFrontPage: () => dispatch(push('/')),
	submit: () => dispatch(submit(form)),
	touch: (...fields) => dispatch(touch(form, ...fields))
}))
@stylesheet(styles)
export default class CreateAccount extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 0,
			methods: [],
			honorCodeOpen: false
		};
	}
	
	_onNext = async () => {
		let { invalid, touch } = this.props;
		if (invalid) { // If validation fails, touch all fields to ensure errors are displayed.
			touch('firstName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPassword', 'birthdate');
		}
		else {
			this.setState({
				page: 1
			});
		}
	};
	
	_onFinish = () => {
		this.setState({
			honorCodeOpen: true
		});
	};
	
	_onAccept = () => {
		this.setState({
			honorCodeOpen: false
		});
		this.props.submit();
	};
	
	_onDecline = () => {
		this.setState({
			honorCodeOpen: false
		});
		this.props.pushToFrontPage();
	};
	
	async componentWillMount() {
		try {
			let response = await get('/loc/comms.json');
			let json = await response.json();
			
			let methods = [];
			for (let key in json) {
				// noinspection JSUnfilteredForInLoop
				methods.push({
					name: key,
					checkLabel: json[key],
					textLabel: key === 'imessage' ? 'Phone number' : 'Username' // TODO a better way?
				});
			}
			this.setState({ methods });
		}
		catch (error) {
			console.error('Error when fetching methods:', error);
		}
	}
	
	render() {
		const { classes, handleSubmit, pushToFrontPage, submit } = this.props;
		let { page, methods, honorCodeOpen } = this.state;
		
		return (
			<div className={classes.wrapper}>
				<div style={{ fontSize: '2em' }}>
					Create Account
				</div>
				<Form
					className={classes.widthContainer}
					onSubmit={handleSubmit}
				>
					<InfoPage style={{ transform: `translateX(${-page * offsetPercent}%)`, transition: `all ${transitionLength}s ease` }} />
					<FormSection name="communication">
						<CommPage
							style={{ position: 'absolute', top: '2em', left: `${(1 - page) * offsetPercent}%`, transition: `all ${transitionLength}s ease` }}
							methods={methods}
						/>
					</FormSection>
				</Form>
				<div style={{ flexGrow: 1 }} />
				<div
					className={classes.widthContainer}
					style={{
						flex: '1 0 3em',
						position: 'relative',
						overflow: 'hidden'
					}}
				>
					<div
						className={classes.buttonRow}
						style={{
							bottom: page === 0 ? '0' : '-120%',
							transitionDelay: page === 0 ? `${transitionLength / 2}s` : '0s'
						}}
					>
						<RaisedButton
							secondary
							label="Cancel"
							onTouchTap={pushToFrontPage}
						/>
						<RaisedButton
							primary
							label="Next"
							onTouchTap={this._onNext}
						/>
					</div>
					<div
						className={classes.buttonRow}
						style={{
							bottom: page === 1 ? '0' : '-120%',
							transitionDelay: page === 1 ? `${transitionLength / 2}s` : '0s'
						}}
					>
						<RaisedButton
							primary
							label="Back"
							onTouchTap={() => this.setState({ page: 0 })}
						/>
						<RaisedButton
							secondary
							label="Confirm"
							onTouchTap={this._onFinish}
						/>
					</div>
				</div>
				<HonorCode
					open={honorCodeOpen}
					onAccept={this._onAccept}
					onDecline={this._onDecline}
				/>
			</div>
		);
	}
};