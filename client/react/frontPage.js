import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';

import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

import Form from './util/form.js';
import TextField from './util/materialUI/TextField.js';
import TextFieldPassword from './util/materialUI/TextFieldPassword.js';

import { login } from '../redux/actions/session.js';

import { zIndex } from '../reference/zIndex.js';

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
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					overflow: 'hidden'
				}}>
					<p style={{fontSize: '2em'}}>Peer Genius</p>
					<p style={{fontSize: '1.75em'}}>Eliminate the Grind</p>
					
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'stretch'
					}}>
						<RaisedButton
							primary={true}
							label={"Create an Account"}
							onTouchTap={this.props.pushToCreateAccount}
							style={{margin: 20}}
						/>
						
						<RaisedButton
							primary={true}
							label={"Log In"}
							onTouchTap={this._openLogin}
							style={{margin: 20}}
						/>
					</div>
				</div>

				<FlatButton
					label={"What is Peer Genius?"}
					onTouchTap={this.props.nextPage}
					style={{
						position: 'absolute',
						backgroundColor: 'blue',
						width: '100%',
						height: 50,
						top: '100vh',
						transform: 'translateY(-50px)'}}
					labelStyle={{
						color: 'white',
						fontWeight: 'bold'	
					}}
				/>

				
				<Dialog
					modal={false}
					open={this.state.loginOpen}
					onRequestClose={this._closeLogin}
					contentStyle={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Form
						header="Log In"
						formName={"login"}
						numInputs={2}
						nextText={"Log in"}
						nextFunc={this.props.login}
						nextStyle={{textAlign: 'center'}}
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
			<div style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<p style={{
					width: '100%',
					textAlign: 'center'
				}}>A web platform where students teach other students to:</p>
				<div style={{
					display: 'flex',
					justifyContent: 'center'
				}}>
					<div style={{
						margin: 20,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
						<p>[Insert Picture Here]</p>
						<p style={{

						}}>Save money while learning</p>
					</div>

					<div style={{
						margin: 20,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
						<p>[Insert Picture Here]</p>
						<p>Gain community service hours while learning</p>
					</div>

					<div style={{
						margin: 20,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
						<p>[Insert Picture Here]</p>
						<p>Network with actual people</p>
					</div>
				</div>
			</div>
		)
	}
}

class PageThree extends React.Component {
	render() {
		return (
			<div style={{
				position: 'absolute',
				height: '100%',
				width: '50%',
				left: '50%',
				transform: 'translateX(-50%)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'start'
			}}>
				<p style={{
					width: '100%',
					textAlign: 'center'
				}}>GURU BENEFITS</p>

				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '75%',
						whiteSpace: 'inital',
						margin: 20
					}}>- Gain volunteer service hours and have the chance to win the Presidential Volunteer Service Award (PVSA).</p>
				</div>

				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '65%',
						whiteSpace: 'inital',
						margin: 20
					}}>- What is PVSA? Click <a href="https://www.presidentialserviceawards.gov/">here</a> to find out more.</p>
				</div>
				
				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '75%',
						whiteSpace: 'inital',
						margin: 20
					}}>- Use <a href="https://voluntu.io">voluntu.io</a> to log all of your hours.</p>
				</div>
				
				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '75%',
						whiteSpace: 'inital',
						margin: 20
					}}>- Customize your profile with flexible times you are available to tutor.</p>
				</div>
			</div>
		)
	}
}

class PageFour extends React.Component {
	render() {
		return (
			<div style={{
				position: 'absolute',
				height: '100%',
				width: '50%',
				left: '50%',
				transform: 'translateX(-50%)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'start'
			}}>
				<p style={{
					width: '100%',
					textAlign: 'center'
				}}>NEWBEE BENEFITS</p>

				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '75%',
						whiteSpace: 'inital',
						margin: 20
					}}>- Gain quality help for free.</p>
				</div>

				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '75%',
						whiteSpace: 'inital',
						margin: 20
					}}>- Find your perfect guru by browsing guru profiles.</p>
				</div>
				
				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '75%',
						whiteSpace: 'inital',
						margin: 20
					}}>- Book a tutoring session in 3 clicks.</p>
				</div>
				
				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<p style={{margin: 20}}>[Icon]</p>
					<p style={{
						width: '75%',
						whiteSpace: 'inital',
						margin: 20
					}}>- After each session, rate your guru & write a review!</p>
				</div>
			</div>
		)
	}
}

@connect(null, dispatch => ({
	pushToCreateAccount: () => {
		dispatch(push('/createAccount'));
	}
}))
class PageFive extends React.Component {
	render() {
		return (
			<div style={{
				position: 'absolute',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<p style={{
					width: '50%',
					whiteSpace: 'inital',
					textAlign: 'center',
					margin: 20
				}}>Okay, Now that you get the idea behind PEER GENIUS...</p>

				<RaisedButton
					primary={true}
					label={"Create an Account"}
					onTouchTap={this.props.pushToCreateAccount}
					style={{margin: 20}}
				/>
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

	_nextPage = () => {
		if (this.state.page < 4) {
			this.setState({
				page: this.state.page + 1
			});
		}
	}

	_prevPage = () => {
		if (this.state.page > 0) {
			this.setState({
				page: this.state.page - 1
			});
		}
	}
	
	render() {
		return (
			<div>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					position: 'absolute',
					top: '50%',
					left: '0%',
					transform: 'translateY(-50%)',
					zIndex: zIndex.frontPageNav
				}}>
					{
						[0, 1, 2, 3, 4].map(id => (
							<IconButton onTouchTap={this._goToPage(id)} iconStyle={{width: 15}} key={id}>
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
							position: 'fixed',
							width: '100vw',
							height: '100vh',
							backgroundColor: backgrounds[id],
							zIndex: zIndex.frontPage[id],
							transform: this.state.page <= id ? 'none' : 'translateY(-100vh)',
							transition: 'transform 1s ease-in-out'
						}} key={id}>
							{React.cloneElement(pages[id], {
								nextPage: this._nextPage,
								prevPage: this._prevPage
							})}
						</div>
					))
				}
			</div>
		);
	}
}