import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';

const AboutUs = props => {
	return (
		<FlatButton
			label="About Us"
			{...props}
			style={{
				color: 'white',
				...props.style
			}}
		/>
	)
};

export default AboutUs;