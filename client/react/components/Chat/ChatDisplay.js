import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

export default class ChatDisplay extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        messages: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.oneOf(['in', 'out']), // Inbound vs outbound messages,
            content: PropTypes.string
        }))
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (<div />)
    }
}