import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { selectIsGuru } from '../redux/selectors/user';

@connect(store => ({
  isGuru: selectIsGuru(store)
}))
export default class HomeRedirect extends Component {
  render() {
    if (this.props.isGuru) {
      return (<Redirect to={'/guru'} />);
    }
    else {
      return (<Redirect to={'/newbie'} />);
    }
  }
}