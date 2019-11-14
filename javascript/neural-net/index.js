function Neuron(id, layer, biaias) {
  this.id = id;
  this.layer = layer;
  this.biaias = biaias;
  this.dropped = false;

  this.output = undefined;
  this.error = undefined;

  this.activation = undefined;
  this.derivative = undefined;
}

function Network(params) {
  // Required variables: lr, layers
  this.lr = undefined; // Learning Rate
  this.layers = undefined;
  this.hiddenlayerFunction = undefined; // Activation function for hidden layer

  this.neurons = undefined;
  this.weights = undefined;
}

function randomBiais() {
  return Math.random() * 2 - 1;
}

function randomWeight() {
  return Math.random() * 2 - 1;
}
