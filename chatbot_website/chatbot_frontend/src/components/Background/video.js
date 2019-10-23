import React, { Component } from 'react';

import { background } from './style.scss';

const VIDEO_RATIO = 1212 / 720;

export default class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 512,
      width: 512
    };
  }
  componentDidMount() {
    this.resize();
    this.resizeEvent = window.addEventListener('resize', () => this.resize());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }
  resize() {
    if (window.innerWidth / window.innerHeight > VIDEO_RATIO) {
      this.setState({
        height: window.innerWidth / VIDEO_RATIO,
        width: window.innerWidth
      });
    } else {
      this.setState({
        height: window.innerHeight,
        width: window.innerHeight * VIDEO_RATIO
      });
    }
  }
  render() {
    const { height, width } = this.state;
    return (
      <div className={background}>
        <video
          autoPlay
          height={height}
          muted
          src='/static/dildo-perceptron-720.mov'
          width={width} />
      </div>
    );
  }
}
