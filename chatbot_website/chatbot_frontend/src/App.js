import React, { Component } from 'react';
import Container from 'src/components/Container';
import PerceptronDrawing from 'src/components/PerceptronDrawing';

import '../scss/base.scss';

export default class App extends Component {
  render() {
    return (
      <Container>
        <h1>Queer AI</h1>
        <PerceptronDrawing height={512} src='/static/rainbow.jpg' width={512} />
      </Container>
    );
  }
}
