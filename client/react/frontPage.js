import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import Form from './util/form.js';
import TextField from './util/materialUI/TextField.js';
import TextFieldPassword from './util/materialUI/TextFieldPassword.js';

import { login } from '../redux/actions/session.js';

const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	},
	center: {
		textAlign: 'center'
	},
	title: {
		fontSize: '2em'
	},
	subtitle: {
		fontSize: '1.75em'
	},
	button: {
		margin: 20
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch'
	}
};

@connect(null, dispatch => ({
	login: () => {
		dispatch(login());
	},
	pushToCreateAccount: () => {
		dispatch(push('/createAccount'));
	}
}))
export default class FrontPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loginOpen: false
		};
	}
	
	_openLogin = () => {
		this.setState({
			loginOpen: true
		});
	};
	
	_closeLogin = () => {
		this.setState({
			loginOpen: false
		});
	};
	
	render() {
		return (
			<div>
				<div style={style.container}>
					<p style={style.title}>Peer Genius</p>
					<p style={style.subtitle}>Eliminate the Grind</p>
					
					{/*<div style={style.buttonContainer}>*/}
					<RaisedButton
						primary={true}
						label={"Create an Account"}
						onTouchTap={this.props.pushToCreateAccount}
						style={style.button}
					/>
					
					<RaisedButton
						primary={true}
						label={"Log In"}
						onTouchTap={this._openLogin}
						style={style.button}
					/>
					{/*</div>*/}
				</div>
				
				<Dialog
					modal={false}
					open={this.state.loginOpen}
					onRequestClose={this._closeLogin}
				>
					<Form
						header="Log In"
						formName={"login"}
						numInputs={2}
						nextText={"Log in"}
						nextFunc={this.props.login}
						nextStyle={style.center}
					>
						<TextField varName={"email"} hintText={"Email"}/>
						<TextFieldPassword varName={"password"} hintText={"Password"}/>
					</Form>
				</Dialog>
			</div>
		);
	}
}