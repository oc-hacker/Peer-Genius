import React from 'react';

export default props => (
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
				<p style={{}}>Save money while learning</p>
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
);