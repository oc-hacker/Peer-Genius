import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';

export default connect(null, dispatch => ({
	pushToCreateAccount: () => {
		dispatch(push('/createAccount'));
	}
}))(props => (
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
			label={'Create an Account'}
			onTouchTap={props.pushToCreateAccount}
			style={{ margin: 20 }}
		/>
	</div>
));