import React, { Component } from 'react';
import BackgroundVideo from 'src/components/Background/video';
import Container from 'src/components/Container';
import ChatField from 'src/components/ChatField';
import ChatLog from 'src/components/ChatLog';
import SessionStart from 'src/components/SessionStart';

import '../scss/base.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Queer AI</h1>
        <BackgroundVideo />
        <Container>
          <ChatLog />
          <ChatField />
          <SessionStart />
        </Container>
      </div>
    );
  }
}
