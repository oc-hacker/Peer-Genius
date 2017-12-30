import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';
import Text from '../Text';
import Button from '../Button';

const AboutUs =
  connect(null, { push })(
    props => (
      <AppBarMenu
        button={
          <Button style={{height: '100%'}} onClick={() => props.push('/aboutUs')}>
            <Text style={{color: 'white', fontFamily: 'sans-serif'}}>About Us</Text>
          </Button>
        }
        onClick={() => props.push('/aboutUs')}
      />
    )
  );

AboutUs.displayName = 'AboutUs';

export default AboutUs;