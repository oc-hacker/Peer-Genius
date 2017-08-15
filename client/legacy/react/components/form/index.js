import { Field as ReduxFormField } from 'redux-form';
import { Checkbox, CheckText, Date, Text } from './field';

export { default as StyledForm } from './StyledForm';
export { default as ReduxForm } from './ReduxForm';

export const Field = {
	...ReduxFormField,
	Checkbox,
	CheckText,
	Date,
	Text
};
