import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { selectSocket } from '../../../redux/selectors/socket';

import Flex from '../Flex';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import { post } from '../../../redux/actions/network';

@connect(state => ({
    socket: selectSocket(state)
}))
export default class Chat extends Component {
    static propTypes = {
        to: PropTypes.string // ID of the receiving is currently talking to.
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
        socket.emit('type_start', {
            to
        });
    };

    _onTypeEnd = submitted => {
        let { to, socket } = this.props;
        socket.emit('type_end', {
            to,
            hasMessage: !submitted && Boolean(this.state.input)
        });
    };

    _onSubmit = () => {
        // Empty submit check
        if (!this.state.value) return;

        let { to, socket } = this.props;

        // Send submission over socket
        socket.emit('sendMessage', {
            to,
            message: this.state.value
        });

        // Update own state
        this.setState(state => ({
            value: '',
            messages: state.messages.concat({
                type: 'out',
                content: state.value,
                timestamp: new Date()
            })
        }));
    };

    _onReceiveMessage = ({from, message, createdAt}) => {
        if (from === this.props.to) { // Check if it is from the current connected user
            this.setState(state => ({
                messages: state.messages.concat({
                    type: 'in',
                    content: message,
                    timestamp: new Date(createdAt)
                })
            }))
        }
    };

    componentWillMount() {
        new Promise(resolve => this.setState({
            loading: true
        }, resolve)).then() // TODO query server and load recent messages
    }

    componentDidMount() {
        // Register socket event listeners
        this.props.socket.addListener('receiveMessage', this._onReceiveMessage)
    }

    componentWillUnmount() {
        // Unregister socket event listeners
        this.props.socket.removeListener('receiveMessage', this._onReceiveMessage)
    }

    render() {
        return (
            <Flex column>
                <ChatDisplay
                    messages={this.state.messages}
                />
                <ChatInput
                    onChange={this._onChange}
                    onTypeStart={this._onTypeStart}
                    onTypeEnd={this._onTypeEnd}
                    onSubmit={this._onSubmit}
                />
            </Flex>
        );
    }
}