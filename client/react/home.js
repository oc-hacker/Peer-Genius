import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import Form from './util/form.js';
import TextField from './util/materialUI/TextField.js';
import TextFieldPassword from './util/materialUI/TextFieldPassword.js';

import { login } from '../redux/actions/session.js';

const style = {
	center: {
		textAlign: 'center'
	},	
	title: {
		textAlign: 'center',
		fontSize: '2em'
	},
	subtitle: {
		textAlign: 'center',
		fontSize: '1.75em'
	}
}

@connect(null, {
	login
})
export default class Home extends React.Component {
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
	}

	_closeLogin = () => {
		this.setState({
			loginOpen: false
		});
	}

	render() {
		return (
			<div>
				<p style={style.title}>Peer Genius</p>
				<p style={style.subtitle}>Eliminate the Grind</p>

				<RaisedButton
					primary={true}
					label={"Create an Account"}
					onTouchTap={this.props.pushToCreateAccount}
				/>

				<RaisedButton
					primary={true}
					label={"Login"}
					onTouchTap={this._openLoginDialog}
				/>

				<Dialog
		        	title="Login"
		        	modal={false}
		        	open={this.state.loginOpen}
		        	onRequestClose={this._closeLogin}
		        >
		        	<Form
		        		formName={"login"}
		        		nextText={"Login"}
		        		nextFunc={this.props.login}
		        		nextStyle={style.center}
		        	>
		        		<TextField varName={"username"} hintText={"Username"} isRequired={true} />
		        		<TextFieldPassword varName={"password"} hintText={"Password"} isRequired={true} />
		        	</Form>
        		</Dialog>
			</div>
		);
	}
}