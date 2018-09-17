import React, { Component } from 'react';
import Container from 'src/components/Container';
import Background from 'src/components/Background';
import ChatField from 'src/components/ChatField';
import ChatLog from 'src/components/ChatLog';
import LanguageSwitch from 'src/components/LanguageSwitch';

import '../scss/base.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Queer AI</h1>
        <Background />
        <Container>
          <ChatLog />
          <ChatField />
          <LanguageSwitch offValue='en' onValue='es' />
        </Container>
      </div>
    );
  }
}
