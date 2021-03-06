import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../../components';
import ViewProfile from './view';
import EditProfile from './edit';

export default class ProfileRouter extends Component {
  render() {
    let { match: { url } } = this.props;
		
    return (
      <Switch>
        <Route exact path={url} component={EditProfile} />
      </Switch>
    );
  }
}