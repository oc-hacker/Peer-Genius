import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';

import StyledForm from './StyledForm';

const ReduxForm = reduxForm({})(props => {
	let { handleSubmit, ...others } = props;
	
	return (
		<StyledForm
			onSubmit={handleSubmit}
			{...others}
		/>
	);
});

// For more props that can be passed in, see [redux-form docs]{@link http://redux-form.com/6.8.0/docs/api/ReduxForm.md/}
ReduxForm.propTypes = {
	dialog: PropTypes.bool,
	dialogProps: PropTypes.shape(Dialog.propTypes),
	form: PropTypes.string.isRequired,
	onSubmit: PropTypes.func,
	initialValues: PropTypes.object,
};

export default ReduxForm;