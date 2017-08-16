import React from 'react';
import { reduxForm, SubmissionError, Form } from 'redux-form';

import Button from 'material-ui/Button';

import TextField from '../client/react/components/form/TextField';
import validator, {required} from '../client/react/components/form/validator';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRedux, withTheme } from './decorators';

const SimpleForm = reduxForm({
	form: 'story',
	// onSubmit: () => new Promise((resolve, reject) => {
	// 	reject(new SubmissionError({ text: 'Error!' }));
	// })
	onSubmit: action('submit')
})(props => (
	<Form onSubmit={props.handleSubmit}>
		<TextField
			name="test"
			label="Test"
			validate={[validator(value => value !== 'error')`Test error`]}
			warn={[validator(value => value !=='warn')`Test warning`]}
		/>
		<TextField
			name="pw"
			type="password"
			label="Pass"
			validate={[required`Need password.`]}
		/>
		<Button
			raised
			type="submit"
		>
			Submit
		</Button>
	</Form>
));

storiesOf('Form', module)
	.addDecorator(withRedux)
	.addDecorator(withTheme)
	.add('with fields', () => <SimpleForm />);

