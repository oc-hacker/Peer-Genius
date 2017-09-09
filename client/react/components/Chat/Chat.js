import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { selectSocket } from '../../../redux/selectors/socket';

import Flex from '../Flex';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';

@connect(state => ({
    socket: selectSocket(state)
}))
export default class Chat extends Component {
    static propTypes = {
        to: PropTypes.string // ID of the user currently talking to.
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            input: '',
            messages: []
        };
    }

    _onChange = input => {
        this.setState({
            input
        });
    };

    _onTypeStart = () => {
        let { to, socket } = this.props;
        socket.emit('type_start', { to });
    };

    _onTypeEnd = () => {
        let { to, socket } = this.props;
        socket.emit('type_end', { to });
    };

    render() {
        return (
            <Flex column>
                <ChatDisplay />
                <ChatInput
                    onChange={this._onChange}
                    onTypeStart={this._onTypeStart}
                    onTypeEnd={this._onTypeEnd}
                />
            </Flex>
        );
    }
}