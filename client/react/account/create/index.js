import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';

import stylesheet from 'react-jss';

// import Form from '../util/form.js';
// import TextField from '../util/materialUI/TextField.js';
// import TextFieldConfirm from '../util/materialUI/TextFieldConfirm.js';
// import TextFieldConfirmPassword from '../util/materialUI/TextFieldConfirmPassword.js';
// import DateField from '../util/materialUI/DateField.js';
// import { verifyEmailText } from '../util/materialUI/verifyField.js';
import InfoPage from './info';
import CommPage from './comm';

import { createAccount } from '../../../redux/actions/account.js';

const transitionLength = 1;
const styles = {
	wrapper: {
		width: '100%',
		height: '100%',
		padding: '4em',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	widthContainer: {
		position: 'relative',
		width: '80%',
		maxWidth: '30em',
		overflow: 'hidden'
	},
	buttonRow: {
		position: 'absolute',
		width: '100%',
		display: 'flex',
		alignItems: 'flex-end',
		transition: `all ${transitionLength / 2}s ease`
	}
};

// @connect(null, dispatch => ({
// 	createAccount: () => {
// 		dispatch(createAccount());
// 	},
// 	pushToFrontPage: () => {
// 		dispatch(push('/'));
// 	}
// }))
// export default class CreateAccount extends React.Component {
// 	render() {
// 		return (
// 			<div style={style.center}>
// 				<Form
// 	        		formName="createAccount"
// 	        		header="Create Account"
// 	        		numInputs={5}
// 	        		nextText="Create"
// 	        		nextFunc={this.props.createAccount}
// 			        backText="Cancel"
// 			        backFunc={this.props.pushToFrontPage}
// 			        backStyle={{
// 			        	position: 'absolute',
// 				        bottom: 0
// 			        }}
// 	        		width={500}
// 	        	>
// 	        		<TextField varName="firstName" hintText="First Name" />
// 	        		<TextField varName="lastName" hintText="Last Name" />
// 	        		<TextFieldConfirm varName="email" hintText="Email" verifyFunc={verifyEmailText} />
// 	        		<TextFieldConfirmPassword varName="password" hintText="Password" />
// 	        		<DateField varName="birthdate" floatingLabelText="Birth Date" minAge={13} maxAge={19} />
// 	        	</Form>
//         	</div>
// 		);
// 	}
// }
@connect(null, dispatch => ({
	pushToFrontPage: () => {
		dispatch(push('/'));
	}
}))
@reduxForm({
	form: 'createAccount',
	onSubmit: (values, dispatch) => {
		dispatch(createAccount(values));
	}
})
@stylesheet(styles)
export default class CreateAccount extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 0
		};
	}
	
	render() {
		const { classes, handleSubmit } = this.props;
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
					<InfoPage style={{ transform: `translateX(-${page}00%)`, transition: `all ${transitionLength}s ease` }} />
					<CommPage style={{ position: 'absolute', transform: `translateX(-${page - 1}00%)`, transition: `all ${transitionLength}s ease` }} />
				</Form>
				<div style={{ flexGrow: 1 }} />
				<div
					className={classes.widthContainer}
					style={{ flex: '1 0 2em', position: 'relative' }}
				>
					<div
						className={classes.buttonRow}
						style={{
							flexDirection: 'row-reverse',
							bottom: page === 0 ? '0' : '-100%',
							transitionDelay: page === 0 ? `${transitionLength / 2}s` : '0s'
						}}
					>
						<RaisedButton
							primary
							label="Next"
							onClick={() => this.setState({ page: 1 })}
						/>
					</div>
					<div
						className={classes.buttonRow}
						style={{
							bottom: page === 1 ? '0' : '-100%',
							transitionDelay: page === 1 ? `${transitionLength / 2}s` : '0s'
						}}
					>
						<RaisedButton
							primary
							label="Back"
							onClick={() => this.setState({ page: 0 })}
						/>
					</div>
				</div>
			</div>
		);
	}
};