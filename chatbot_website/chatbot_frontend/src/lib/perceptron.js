import { Layer, Network } from 'synaptic';

const Perceptron = function(input, hidden, output) {
  const inputLayer = new Layer(input);
  const hiddenLayer = new Layer(hidden);
  const outputLayer = new Layer(output);

  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);

  this.set({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });
};

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

export default Perceptron;
