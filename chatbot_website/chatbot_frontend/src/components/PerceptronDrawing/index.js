import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Perceptron from '../../lib/Perceptron';

import { perceptron } from './style.scss';

const CANVAS_HEIGHT = 125;
const CANVAS_WIDTH = 125;

export default class PerceptronDrawing extends Component {
  static defaultProps = {
    height: 1024,
    width: 1024
  };
  static propTypes = {
    height: PropTypes.number,
    src: PropTypes.string,
    width: PropTypes.number
  };
  constructor(props) {
    super(props);
    this.imageData = null;
    this.numIterations = 0;
    this.perceptron = new Perceptron(2, 16, 3);
  }
  getCanvas() {
    //const canvas = document.createElement('canvas')
    //canvas.height = CANVAS_HEIGHT;
    //canvas.weidth = CANVAS_WIDTH;
    //const fragment = document.createDocumentFragment()
    //fragment.appendChild(canvas);
    //return canvas;
    return this.canvasEl;
  }
  getData(img) {
    const ctx = this.getCanvas().getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const data = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return data;
  }
  getImageData(src) {
    const img = new Image();
    img.src = src;
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(this.getData(img));
      } else {
        img.onload = () => resolve(this.getData(img));
      }
    });
  }
  getPixel(x, y) {
    const data = this.imageData.data;
    const red = data[ ((CANVAS_HEIGHT * y) + x) * 4];
    const green = data[ ((CANVAS_HEIGHT * y) + x) * 4 + 1];
    const blue = data[ ((CANVAS_HEIGHT * y) + x) * 4 + 2];
    return [red / 255, green / 255, blue / 255];
  }
  componentDidMount() {
    const { src } = this.props;
    this.getImageData(src).then((data) => {
      this.imageData = data;
      this.train();
    });
  }
  train() {
    for (let x = 0; x < CANVAS_WIDTH; x++) {
      for(let y = 0; y < CANVAS_HEIGHT; y++) {
        const dynamicRate = .01 / (1 + .0005 * this.numIterations);
        this.perceptron.activate([ x / CANVAS_WIDTH, y / CANVAS_HEIGHT ]);
        this.perceptron.propagate(dynamicRate, this.getPixel(x, y));
      }
    }
    this.numIterations++;
    this.preview();
    requestAnimationFrame(() => this.train());
  }
  preview() {
    const height = CANVAS_HEIGHT;
    const width = CANVAS_WIDTH;
    const ctx = this.canvasEl.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for(let y = 0; y < height; y++) {
        const rgb = this.perceptron.activate([ x / width, y / height ]);
        imageData.data[ ((height * y) + x) * 4] = rgb[0] * 255;
        imageData.data[ ((height * y) + x) * 4 + 1] = rgb[1] * 255;
        imageData.data[ ((height * y) + x) * 4 + 2] = rgb[2] * 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
  render() {
    const { height, width } = this.props;
    return (
      <div className={perceptron} style={{ height, width }}>
        <canvas
          height={CANVAS_HEIGHT}
          ref={(ref) => this.canvasEl = ref }
          style={{ transform: `scale3d(${width / CANVAS_WIDTH}, ${height / CANVAS_HEIGHT}, 1)` }}
          width={CANVAS_WIDTH}
          />
      </div>
    );

  }
}
