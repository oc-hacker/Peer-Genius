import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { selectIsGuru } from '../../../redux/selectors/user';

import AppBarMenu from './AppBarMenu';

import Button from '../Button';
import Text from '../Text';

@connect(store => ({
  isGuru: selectIsGuru(store)
}))
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
    /* Check to see if the user is a guru or not
     * if they are, do not let them sign up again
     * otherwise let them proceed
     */  
    if (this.props.isGuru !== undefined) {
      if (this.props.isGuru) {
        // TODO: error msg
      }
      else {
        this.props.push('/guru/signUp');
      }
    } else return null;
  };

  _toGuruDashboard = () => {
    /* Check to see if the user is a guru or not
     * if they are, let them go to the dashboard
     * otherwise do not
     */  
    if (this.props.isGuru !== undefined) {
      if (this.props.isGuru) {
        this.props.push('/guru');
      }
      else {
        // TODO: error msg
        return;
      }
    } else return null;
  }

  _toCurrentSessions = () => {
    /* Check to see if the user is a guru or not
     * if they are, let them go to the page
     * otherwise do not
     */  
    if (this.props.isGuru !== undefined) {
      if (this.props.isGuru) {
        this.props.push('/guru/sessions');
      }
      else {
        // TODO: error msg
        return;
      }
    } else return null;
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
        <MenuItem onClick={this._toCurrentSessions}>Current Sessions</MenuItem>
      </AppBarMenu>
    );
  }
}