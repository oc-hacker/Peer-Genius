import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

import Form, { Field } from '../client/react/components/form';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRedux, withTheme } from './decorators';

const SimpleForm = reduxForm({
	form: 'story',
	onSubmit: () => new Promise((resolve, reject) => {
		reject(new SubmissionError({text: 'Error!'}))
	})
})(props => (
	<Form onSubmit={props.handleSubmit}>
		<Field.Checkbox
			name="check"
			label="Checkbox"
		/>
		<Field.Text
			name="text"
			label="Text Field"
		/>
		<Field.Text
			name="password"
			type="password"
			label="Password Field"
		/>
		<Field.CheckText
			name="checked"
			label="Checked Text"
		/>
		<Field.Date
			name="date 1"
			label="Date Field 1"
		/>
		<Field.Date
			name="date2"
			label="Date Field 2"
			openToYearSelection={false}
			disableToday
		/>
		<RaisedButton
			type="submit"
			label="Submit"
		/>
	</Form>
));

storiesOf('Form', module)
	.addDecorator(withRedux)
	.addDecorator(withTheme)
	.add('with fields', () => <SimpleForm/>);

