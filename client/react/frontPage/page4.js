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
		}}>NEWBEE BENEFITS</p>
		
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
			}}>- Gain quality help for free.</p>
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
			}}>- Find your perfect guru by browsing guru profiles.</p>
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
			}}>- Book a tutoring session in 3 clicks.</p>
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
			}}>- After each session, rate your guru & write a review!</p>
		</div>
	</div>
);
