import React from 'React';

import PropTypes from 'prop-types';

import Flex from '../Flex';

/**
 * Flat buttons (see guru_page.jpg of design)
 */
export default class FlatButton extends React.Component {
    static propTypes = {
        iconLeft: PropTypes.boolean,
        iconRight: PropTypes.boolean
    };

    render() {
        return (

        );
    }
}

FlatButton.defaultProps = {
    iconLeft: false,
    iconRight: false
};
