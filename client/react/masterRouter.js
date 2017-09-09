import React, { Component } from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { connect } from 'react-redux';

import { Route } from './components';
import FrontPage from './frontPage';
import UserPage from './userPage';
import { initialize } from '../redux/actions/creators/init';
import AboutUs from './aboutUs';

import { browserHistory } from '../redux/store';

@connect(null, { initialize })
export default class MasterRouter extends Component {
  componentWillMount() {
    this.props.initialize();
  }

  render() {
    // TODO make UserPage private once testing is finished.
    return (
      <ConnectedRouter history={browserHistory}>
        <Switch>
          <Route access="public" exact path="/" component={FrontPage} />
          <Route access="public" exact path="/aboutUs" component={AboutUs} />
          <Route path="/" component={UserPage} />
        </Switch>
      </ConnectedRouter>
    );
  }
}