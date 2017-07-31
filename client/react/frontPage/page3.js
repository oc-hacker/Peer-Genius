import React from 'react';

export default props => (
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
			<p style={{ margin: 20 }}>[Icon]</p>
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
			<p style={{ margin: 20 }}>[Icon]</p>
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
			<p style={{ margin: 20 }}>[Icon]</p>
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
			<p style={{ margin: 20 }}>[Icon]</p>
			<p style={{
				width: '75%',
				whiteSpace: 'inital',
				margin: 20
			}}>- Customize your profile with flexible times you are available to tutor.</p>
		</div>
	</div>
);
