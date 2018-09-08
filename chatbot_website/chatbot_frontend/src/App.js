import React, { Component } from 'react';
import Container, { Content } from 'src/components/Container';
import Background from 'src/components/Background';
import ChatField from 'src/components/ChatField';

import '../scss/base.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <Background />
        <Container>
          <Content>
            <h1>Queer AI</h1>
          </Content>
          <ChatField />
        </Container>
      </div>
    );
  }
}
