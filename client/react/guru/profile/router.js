import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../../components';
import GuruProfile from './profile';
//TODO: profile of other guru

export default class GuruProfileRouter extends Component {
  render() {
    let { match: { url } } = this.props;

    return (
      <Switch>
        <Route exact path={`${url}`} component={GuruProfile} /> {/* PROFILE of SELF */}
        <Route path={`${url}/:guruUUID`} component={GuruProfile} /> {/* TODO: PROFILE of OTHER GURU */}
      </Switch>
    );
  }
}
