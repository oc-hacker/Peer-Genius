import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Route } from '../components';
import SessionsRouter from './sessions';
import NewbieDashboard from './newbieDashboard';

export default class NewbieRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { match: { url } } = this.props;

        return (
            <Switch>
                <Route path={`${url}`} component={NewbieDashboard} />
				<Route path={`${url}/sessions`} component={SessionsRouter} />
            </Switch>
        );
    }
}