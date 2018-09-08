import React, { Component } from 'react';
import PerceptronDrawing from 'src/components/PerceptronDrawing';

import { background } from './style.scss';

const IMAGES = [
  'rainbow.jpg',
  'pink.jpg',
  'tie-die.jpg',
  'glass.jpg',
  'purple.jpg',
  'rippler.jpg'
];

export default class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 512,
      imageToDraw: 0,
      width: 512
    };
  }
  componentDidMount() {
    setInterval(
      () => this.setState({
        imageToDraw: this.state.imageToDraw < IMAGES.length - 1 ? this.state.imageToDraw + 1 : 0
      }),
      60000
    );
    this.resize();
    this.resizeEvent = window.addEventListener('resize', () => this.resize());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }
  resize() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
  render() {
    const { height, imageToDraw, width } = this.state;
    return (
      <div className={background}>
        <PerceptronDrawing height={height} src={`/static/${IMAGES[imageToDraw]}`} width={width} />
      </div>
    );
  }
}
