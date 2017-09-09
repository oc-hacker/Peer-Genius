import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';

const AboutUs =
  connect(null, { push })(
    props => (
      <AppBarMenu
        button={'About Us'}
        onClick={() => props.push('/aboutUs')}
      />
    )
  );

AboutUs.displayName = 'AboutUs';

export default AboutUs;