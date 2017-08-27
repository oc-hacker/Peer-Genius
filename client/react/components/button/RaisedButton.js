import React from 'React';

import PropTypes from 'prop-types';

import { RaisedButton } from 'material-ui/RaisedButton';

/**
 * Flat buttons (see guru_page.jpg of design)
 */
export default class RaisedButton extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        primary: PropTypes.boolean,
        secondary: PropTypes.boolean,
        transparent: PropTypes.boolean
    };

    render() {
        let {
			label, primary, secondary, transparent,
            ...buttonProps
		} = this.props;

        if(primary) {
            return (
                <RaisedButton
                    primary
                    label={label}
                    buttonStyle={{ borderRadius: 5 }}
                    style={{ borderRadius: 5 }}
                    {...ButtonProps}
                />
            );
        } else if (secondary) {
            return (
                <RaisedButton
                    secondary
                    label={label}
                    buttonStyle={{ borderRadius: 5 }}
                    style={{ borderRadius: 5 }}
                    {...buttonProps}
                />
            );
        } else if (transparent) {
            return (
                <RaisedButton
                    label={label}
                    buttonStyle={{ borderRadius: 5, borderColor: 'black' }}
                    style={{ borderRadius: 5, borderColor: 'black' }}
                    labelColor={'transparent'}
                    backgroundColor={'transparent'}
                    {...buttonProps}
                />
            );
        }
    }
}

RaisedButton.defaultProps = {
    label: '',
    primary: true,
    secondary: false,
    transparent: false
};
