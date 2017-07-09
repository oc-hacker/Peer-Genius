import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';

import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

import Form from './util/form.js';
import TextField from './util/materialUI/TextField.js';
import TextFieldPassword from './util/materialUI/TextFieldPassword.js';

import { login } from '../redux/actions/session.js';

import { zIndex } from '../reference/zIndex.js';

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
	},
	dialogContent: {
		display: 'flex',
		alignItems: 'center'
	},
	nav: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		top: '50%',
		left: '0%',
		transform: 'translateY(-50%)',
		zIndex: zIndex.frontPageNav
	},
	icon: {
		width: 15
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
class PageOne extends React.Component {
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
					
					<div style={style.buttonContainer}>
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
					</div>
				</div>
				
				<Dialog
					modal={false}
					open={this.state.loginOpen}
					onRequestClose={this._closeLogin}
					contentStyle={style.dialogContent}
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

class PageTwo extends React.Component {
	render() {
		return (
			<div>
				<p style={style.center}>Page 2</p>
			</div>
		)
	}
}

class PageThree extends React.Component {
	render() {
		return (
			<div>
				<p style={style.center}>Page 3</p>
			</div>
		)
	}
}

class PageFour extends React.Component {
	render() {
		return (
			<div>
				<p style={style.center}>Page 4</p>
			</div>
		)
	}
}

class PageFive extends React.Component {
	render() {
		return (
			<div>
				<p style={style.center}>Page 5</p>
			</div>
		)
	}
}

const pages = [
	<PageOne />,
	<PageTwo />,
	<PageThree />,
	<PageFour />,
	<PageFive />
];

const backgrounds = [
	'white',
	'blue',
	'yellow',
	'blue',
	'yellow'
]

export default class FrontPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 0
		};
	}

	_goToPage = id => () => {
		this.setState({
			page: id
		});
	}
	
	render() {
		return (
			<div>
				<div style={style.nav}>
					{
						[0, 1, 2, 3, 4].map(id => (
							<IconButton onTouchTap={this._goToPage(id)} iconStyle={style.icon} key={id}>
								{
									this.state.page === id ? <RadioButtonChecked /> : <RadioButtonUnchecked />
								}
							</IconButton>
						))
					}
				</div>
				
				{
					[0, 1, 2, 3, 4].map(id => (
						<div style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							backgroundColor: backgrounds[id],
							zIndex: zIndex.frontPage[id],
							transform: this.state.page <= id ? 'none' : 'translateY(-100vw)',
							transition: 'transform 1s ease-in-out'
						}}>
							{pages[id]}
						</div>
					))
				}
			</div>
		);
	}
}