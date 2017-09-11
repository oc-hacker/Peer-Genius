import React, { Component, Children } from 'react';

import Button from '../client/react/components/Button';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRedux, withTheme } from './decorators';
import ChatMessage from '../client/react/components/Chat/ChatMessage';
import Flex from '../client/react/components/Flex';

storiesOf('chat', module)
  .addDecorator(withTheme)
  .add('chat message', () => (
    <Flex column>
      <ChatMessage
        type={'in'}
        content={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}
      />
      <ChatMessage
        type={'out'}
        content={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}
      />
    </Flex>
  ));
