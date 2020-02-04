const http = require('http');
const cbor = require('cbor');
const markets = require('./markets.json');

const type = process.argv.pop();
let contentType, data;

switch (type) {
  case 'cbor': 
    data = cbor.encode(markets);
    contentType = 'application/octet-stream';
    break;

  case 'json':
  default:
    data = JSON.stringify(markets);
    contentType = 'application/json';
}

const length = Buffer.byteLength(data);
const req = http.request({
  hostname: '127.0.0.1',
  path: '/' + type,
  port: 9090,
  method: 'POST',
  headers: {
    'Content-Length': length,
    'Content-Type': contentType
  }
});

console.log(`Performing request with encoding ${ type.toUpperCase() } with length ${ length }`);

req.on('error', console.error);
req.write(data);
req.end();
