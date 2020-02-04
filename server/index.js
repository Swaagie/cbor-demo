const bodyParser = require('body-parser');
const express = require('express');
const cbor = require('cbor');
const app = express();

app.post('/json', bodyParser.json(), function ({ headers, body }, res) {
  console.log(body);
  res.end();
});

app.post('/cbor', bodyParser.raw(), function ({ headers, body }, res) {
  console.log(cbor.decode(body));
  res.end();
});

app.listen(9090);
