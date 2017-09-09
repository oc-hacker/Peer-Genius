import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../components';
import Home from './home';
import GuruSearch from './guruSearch';

export default class HomeRouter extends Component {
  render() {
    let { match: { url } } = this.props;

    return (
      <Switch>
        <Route exact path={`${url}`} component={Home} />
        <Route path={`${url}/schedule`} component={GuruSearch} />
      </Switch>
    );
  }
}
