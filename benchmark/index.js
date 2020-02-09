const Benchmark = require('benchmark');
const CBOR = require('cbor');
const markets = require('../markets.json');

const encoded = {
  cbor: CBOR.encode(markets),
  json: JSON.stringify(markets)
}

function cycle(event) {
  console.log(String(event.target));
}

function complete() {
  console.log('Fastest is ' + this.filter('fastest').map('name') + '\n');
}

// Test encoding/serialization
new Benchmark.Suite()
  .add('JSON.stringify', () => {
    JSON.stringify(markets);
  })
  .add('CBOR.encode', () => {
    CBOR.encode(markets);
  })
  .on('cycle', cycle)
  .on('complete', complete)
  .run({ 'async': false });

// Test decoding/deserialization
new Benchmark.Suite()
  .add('JSON.parse', () => {
    JSON.parse(encoded.json);
  })
  .add('CBOR.decode', () => {
    CBOR.decode(encoded.cbor);
  })
  .on('cycle', cycle)
  .on('complete', complete)
  .run({ 'async': false });
