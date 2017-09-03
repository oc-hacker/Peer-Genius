import React from 'react';

// TODO get SVG logo
const PeerGeniusLogo = props => (
	<img
		src="icon.png"
		{...props}
	/>
);

PeerGeniusLogo.displayName = 'Logo';

export default PeerGeniusLogo;

