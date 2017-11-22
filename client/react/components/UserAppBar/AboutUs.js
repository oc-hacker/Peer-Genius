import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';
import Text from '../Text';

const AboutUs =
  connect(null, { push })(
    props => (
      <AppBarMenu
        button={<Text style={{color: 'white', fontFamily: 'sans-serif'}}>About Us</Text>}
        onClick={() => props.push('/aboutUs')}
      />
    )
  );

AboutUs.displayName = 'AboutUs';

export default AboutUs;