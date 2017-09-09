import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import StyledInput from '../StyledInput';

export default class ChatInput extends Component {
    static propTypes = {
        // Controlled component
        value: PropTypes.string,
        onChange: PropTypes.func, // Called with the new value, not the event
        onSubmit: PropTypes.func,
        // User status indicator
        onTypeStart: PropTypes.func,
        onTypeEnd: PropTypes.func,
        onInactive: PropTypes.func,
        // Debounce setting
        delay: PropTypes.number, // Amount of time to wait before indicating that the user stopped typing
        timeout: PropTypes.number // Amount of time to wait before indicating that the user is inactive
    };

    static defaultProps = {
        delay: 5000,
        timeout: 5 * 60 * 1000
    };

    constructor(props) {
        super(props);
    }

    _onTypeStart = debounce(
        this.props.onTypeStart,
        this.props.delay,
        { leading: true, trailing: false }
    );

    _onTypeEnd = debounce(
        this.props.onTypeEnd,
        this.props.delay,
        { leading: false, trailing: true }
    );

    _monitorInactive = debounce(
        this.props.onInactive,
        this.props.timeout,
        { leading: false, trailing: true }
    );

    _onChange = event => {
        this._onTypeStart();
        this.props.onChange(event.target.value);
        this._onTypeEnd();
        this._monitorInactive();
    };

    _onKeyPress = event => {
        if (event.key === 'Enter') {
            // Immediately trigger onTypeEnd
            this._onTypeEnd.flush();
            // Enter key pressed, submit
            this.props.onSubmit();
        }
    };

    render() {
        let { onTypeStart, onTypeEnd, onChange, onSubmit, ...others } = this.props;

        return (
            <StyledInput
                Component={'div'}
                contentEditable
                onChange={this._onChange}
                onKeyPress={this._onKeyPress}
                {...others}
            />
        );
    }
}