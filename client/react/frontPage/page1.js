import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


import Login from './login';

// import Form from '../util/form.js';
// import TextField from '../util/materialUI/TextField.js';
// import TextFieldPassword from '../util/materialUI/TextFieldPassword.js';

import { login } from '../../redux/actions/session.js';

@connect(null, dispatch => ({
	pushToCreateAccount: () => {
		dispatch(push('/createAccount'));
	}
}))
export default class PageOne extends PureComponent {
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
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					overflow: 'hidden'
				}}>
					<p style={{ fontSize: '2em' }}>Peer Genius</p>
					<p style={{ fontSize: '1.75em' }}>Eliminate the Grind</p>
					
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'stretch'
					}}>
						<RaisedButton
							primary={true}
							label={'Create an Account'}
							onTouchTap={this.props.pushToCreateAccount}
							style={{ margin: 20 }}
						/>
						
						<RaisedButton
							primary={true}
							label={'Log In'}
							onTouchTap={this._openLogin}
							style={{ margin: 20 }}
						/>
					</div>
				</div>
				
				<FlatButton
					label={'What is Peer Genius?'}
					onTouchTap={this.props.nextPage}
					style={{
						position: 'absolute',
						backgroundColor: 'rgb(1,147,172)',
						width: '100%',
						height: 50,
						top: '100vh',
						transform: 'translateY(-50px)'
					}}
					labelStyle={{
						color: 'white',
						fontWeight: 'bold'
					}}
				/>
				
				<Login open={this.state.loginOpen} onRequestClose={this._closeLogin} />
				{/*<Dialog*/}
				{/*modal={false}*/}
				{/*open={this.state.loginOpen}*/}
				{/*onRequestClose={this._closeLogin}*/}
				{/*contentStyle={{*/}
				{/*display: 'flex',*/}
				{/*alignItems: 'center'*/}
				{/*}}*/}
				{/*>*/}
				{/*<Form*/}
				{/*header="Log In"*/}
				{/*formName={'login'}*/}
				{/*numInputs={2}*/}
				{/*nextText={'Log in'}*/}
				{/*nextFunc={this.props.login}*/}
				{/*nextStyle={{ textAlign: 'center' }}*/}
				{/*>*/}
				{/*<TextField varName={'email'} hintText={'Email'} />*/}
				{/*<TextFieldPassword varName={'password'} hintText={'Password'} />*/}
				{/*</Form>*/}
				{/*</Dialog>*/}
			</div>
		);
	}
}