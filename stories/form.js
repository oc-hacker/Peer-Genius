import React from 'react';
import { reduxForm, SubmissionError, Form } from 'redux-form';

import Button from 'material-ui/Button';

import ReduxForm from '../client/react/components/form/ReduxForm';
import CheckboxField from '../client/react/components/form/CheckboxField';
import CheckTextField from '../client/react/components/form/CheckTextField';
import DateField from '../client/react/components/form/DateField';
import TextField from '../client/react/components/form/TextField';
import SelectField from '../client/react/components/form/SelectField';
import StarField from '../client/react/components/form/StarField';
import CommunicationFields from '../client/react/components/CommunicationFields';
import validator, { required } from '../client/react/components/form/validator';

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

