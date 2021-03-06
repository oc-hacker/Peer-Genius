import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from './components';
import AccountRouter from './account';
import GuruRouter from './guru';
import NewbieRouter from './newbie';
import HomeRedirect from './homeRedirect';

export default class UserRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/home" component={HomeRedirect} />
        <Route path="/account" component={AccountRouter} />
        <Route path="/guru" component={GuruRouter} />
        <Route path="/newbie" component={NewbieRouter} />
        {/*<Route access="all" path="/" component={NotFound} />*/}
      </Switch>
    );
  }
}
