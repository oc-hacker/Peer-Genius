import React from 'react';
import { reduxForm, SubmissionError, Form } from 'redux-form';

import Button from 'material-ui/Button';

import ReduxForm from '../react/components/form/ReduxForm';
import CheckboxField from '../react/components/form/CheckboxField';
import CheckTextField from '../react/components/form/CheckTextField';
import DateField from '../react/components/form/DateField';
import TextField from '../react/components/form/TextField';
import SelectField from '../react/components/form/SelectField';
import StarField from '../react/components/form/StarField/index';
import CommunicationFields from '../react/components/CommunicationFields';
import validator, { required } from '../react/components/form/validator';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRedux, withTheme } from './decorators';

storiesOf('Form', module)
    .addDecorator(withRedux)
    .addDecorator(withTheme)
    .add('redux form', () => (
        <ReduxForm form="testForm" onSubmit={action('submit')}>
            <TextField
                name="text1"
                label="Text 1"
            />
            <CheckboxField
                name="check1"
                label="Check 1"
            />
            <CheckTextField
                name="checkText"
                checkLabel="Check"
                textLabel="Text"
                validate={validator(value => value !== null)`Not null`}
            />
            <SelectField
                name="select"
                label="Select"
                options={[
                    { value: 'o1', label: 'Option 1' },
                    { value: 'o2', label: 'Option 2' }
                ]}
                validate={validator(value => value !== 'o2')`Test error`}
            />
            <DateField
                name="date"
                label="Date"
                defaultMode="year"
            />
            <StarField
                name="rating"
            />
            <Button
                raised
                type="submit"
            >
                Submit
            </Button>
        </ReduxForm>
    ))
    .add('comms form', () => (
        <ReduxForm form="comms" onSubmit={console.log}>
            <CommunicationFields />
        </ReduxForm>
    ));

