import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, reduxForm, formValueSelector, startAsyncValidation, stopAsyncValidation, submit, touch } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';

import stylesheet from 'react-jss';

import InfoPage from './info';
import CommPage from './comm';

import { createAccount } from '../../../redux/actions/account.js';
import { post } from '../../../reference/api';

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
const formSelector = formValueSelector(form);

@reduxForm({
	form,
	onSubmit: async (values, dispatch) => {
		await dispatch(createAccount(values));
	}
})
@connect(state => ({
	email: formSelector(state, 'email'),
}), dispatch => ({
	pushToFrontPage: () => {
		dispatch(push('/'));
	},
	startAsyncValidation: () => dispatch(startAsyncValidation(form)),
	stopAsyncValidation: errors => dispatch(stopAsyncValidation(form, errors)),
	submit: () => dispatch(submit(form)),
	touchAll: (...fields) => dispatch(touch(form, ...fields))
}))
@stylesheet(styles)
export default class CreateAccount extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 0
		};
	}
	
	onNext = async () => {
		let { invalid, touchAll, startAsyncValidation, stopAsyncValidation } = this.props;
		if (invalid) { // If sync validation fails, touch all fields to ensure errors are displayed.
			touchAll('firstName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPassword', 'birthdate');
			return;
		}
		
		startAsyncValidation();
		let result = await post('/api/checkEmail', { email: this.props.email });
		let json = await result.json();
		
		if (json.taken) {
			// Email already taken, don't go to next page.
			stopAsyncValidation({
				email: 'Email already associated with an account'
			});
		}
		else {
			stopAsyncValidation();
			this.setState({
				page: 1
			});
		}
	};
	
	render() {
		const { classes, handleSubmit, pushToFrontPage, submit } = this.props;
		let { page } = this.state;
		
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
					<CommPage style={{ position: 'absolute', top: '2em', left: `${(1 - page) * offsetPercent}%`, transition: `all ${transitionLength}s ease` }} />
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
							onTouchTap={this.onNext}
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
							onTouchTap={submit}
						/>
					</div>
				</div>
			</div>
		);
	}
};