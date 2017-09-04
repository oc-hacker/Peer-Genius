import React, { Component, Children } from 'react';

import Button from '../client/react/components/Button';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRedux, withTheme } from './decorators';

storiesOf('Button', module)
    .addDecorator(withTheme)
    .add('primary', () => (
        <Button
            color="primary"
            onClick={action('click')}
        >
            Beep
        </Button>
    ));