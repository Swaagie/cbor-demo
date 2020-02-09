const cbor = require('cbor');

function main(markets) {
  //
  // Encode market data to JSON and get buffer byte length.
  //
  const stringified = JSON.stringify(markets);
  console.log(`JSON buffer length: ${ Buffer.from(stringified).length }`);

  //
  // Encode market data to CBOR and get buffer byte length
  //
  const cbored = cbor.encode(markets);
  console.log(`CBOR buffer length ${ cbored.length }`); 
}

//
// Response from GoDaddy Market API, en-US.
// https://api.ote-godaddy.com/v1/countries/us?marketId=en&sort=key&order=ascending
//
main(require('../markets.json'));

