import React from 'React';

import PropTypes from 'prop-types';

import { RaisedButton } from 'material-ui/RaisedButton';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = ({ palette: { grey, error }, spacing }) => ({
	root: {
		display: 'flex'
	},
	divider: {
		width: 1,
		margin: `${spacing.unit / 2}px 0`,
		backgroundColor: grey[300]
	},
    buttons: {
        borderRadius: 10,
        style: {
            borderRadius: 10
        }
    }
});

/**
 * Raised buttons
 */
@withStyles(styles)
export default class Raised extends React.Component {
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
                    {...buttonProps}
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
