import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';

import Button from '../Button';
import Text from '../Text';

@connect(null, { push })
export default class GuruMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  _openMenu = () => {
    this.setState({
      open: true
    });
  };

  _closeMenu = () => {
    this.setState({
      open: false
    });
  };

  _toGuruSignUp = () => {
    this.props.push('/guru/signUp');
  };

  _toGuruDashboard = () => {
    this.props.push('/guru');
  }

  render() {
    let { open } = this.state;

    return (
      <AppBarMenu
        button={
          <Button style={{height: '100%'}} onClick={this._openMenu}>
            <Text style={{color: 'white', fontFamily: 'sans-serif'}}>Gurus</Text>
          </Button>
        }
        open={open} onClick={this._openMenu} onRequestClose={this._closeMenu}
      >
        <MenuItem onClick={this._toGuruSignUp}>Become a Guru</MenuItem>
        <MenuItem onClick={this._toGuruDashboard}>Guru Requests</MenuItem>
      </AppBarMenu>
    );
  }
}