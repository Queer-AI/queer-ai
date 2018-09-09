import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Perceptron from '../../lib/Perceptron';

import { perceptron } from './style.scss';

const CANVAS_HEIGHT = 130;
const CANVAS_WIDTH = 130;

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
    this.perceptron = new Perceptron(2, 8, 3);
  }
  componentWillReceiveProps(newProps) {
    const { src } = newProps;
    this.loadImage(src);
  }
  componentDidMount() {
    const { src } = this.props;
    this.loadImage(src)
      .then((data) => {
        this.drawData(data);
        this.train();
      });
  }
  getCanvas() {
    const canvas = document.createElement('canvas')
    canvas.height = CANVAS_HEIGHT;
    canvas.weidth = CANVAS_WIDTH;
    const fragment = document.createDocumentFragment()
    fragment.appendChild(canvas);
    return canvas;
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
  loadImage(src) {
    return this.getImageData(src).then((data) => {
      this.imageData = data;
      return data;
    });
  }
  drawData(imageData) {
    const ctx = this.canvasEl.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
  }
  train() {
    if (this.imageData) {
      for (let x = 0; x < CANVAS_WIDTH; x++) {
        for(let y = 0; y < CANVAS_HEIGHT; y++) {
          //const dynamicRate = .01 / (1 + .0005 * this.numIterations);
          const dynamicRate = .01 / (1.1);
          this.perceptron.activate([ x / CANVAS_WIDTH, y / CANVAS_HEIGHT ]);
          this.perceptron.propagate(dynamicRate, this.getPixel(x, y));
        }
      }
      this.numIterations++;
      this.preview();
    }
    requestAnimationFrame(() => this.train());
  }
  preview() {
    const height = CANVAS_HEIGHT;
    const width = CANVAS_WIDTH;
    const ctx = this.canvasEl.getContext('2d');
    const canvasData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let x = 0; x < CANVAS_WIDTH; x++) {
      for(let y = 0; y < CANVAS_HEIGHT; y++) {
        const rgb = this.perceptron.activate([ x / CANVAS_WIDTH, y / CANVAS_HEIGHT ]);
        canvasData.data[ ((CANVAS_HEIGHT * y) + x) * 4] = rgb[0] * 255;
        canvasData.data[ ((CANVAS_HEIGHT * y) + x) * 4 + 1] = rgb[1] * 255;
        canvasData.data[ ((CANVAS_HEIGHT * y) + x) * 4 + 2] = rgb[2] * 255;
      }
    }
    this.drawData(canvasData);
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
