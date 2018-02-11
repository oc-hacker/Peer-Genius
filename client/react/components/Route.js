import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

import cookies from 'js-cookie';


/**
 * @classdesc A custom <code>Route</code> component that automatically detects whether the user is in session and may push the user accordingly.
 */
export default class CustomRoute extends Component {
  static propTypes = {
    /** public - only when not logged in; private - only when logged in; all - does not matter */
    access: PropTypes.oneOf(['public', 'private', 'all']),
    path: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func
  };

  static defaultProps = {
    access: 'all',
    path: '/'
  };

  render() {
    // Extract router props
    let { access, push, ...routeProps } = this.props;

    let jwt = cookies.get('sessionJWT');
    // Check that the user is in a valid place.
    if (access === 'public' && jwt) {
      return (<Redirect to={'/home'} />);
    }
    else if (access === 'private' && !jwt) {
      return (<Redirect to={'/'} />);
    }

    return (<Route {...routeProps} />);
  }
}