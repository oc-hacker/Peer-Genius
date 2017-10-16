import React, { Component, Children } from 'react';

import Button from '../react/components/Button';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRedux, withTheme } from './decorators';
import ChatMessage from '../react/components/Chat/ChatMessage';
import Flex from '../react/components/Flex';
import ReviewSession from '../react/newbie/sessions/review/reviewSession';
import ChatVideo from '../react/components/Chat/ChatVideoScreen';

import { serverURL } from '../config';

import Peer from 'peerjs';

storiesOf('chat', module)
  .addDecorator(withRedux)
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
  ))
  .add('review popup', () => (
    <ReviewSession />
  ))
  .add('video chat', () => (
    <ChatVideo peer={new Peer('left', { host: serverURL, port: 80, path: '/peerjs' })} />
  ))
  .add('other video chat', () => (
    <ChatVideo peer={new Peer('right', { host: serverURL, port: 80, path: '/peerjs' })} />
  ));
