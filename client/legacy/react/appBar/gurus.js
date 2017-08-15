import React from 'react';

import FlatButton from 'material-ui/FlatButton';

const Gurus = props => {
	return (
		<FlatButton
			label="Gurus"
			{...props}
			style={{
				color: 'white',
				...props.style
			}}
		/>
	)
};

export default Gurus;
