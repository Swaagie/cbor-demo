const bodyParser = require('body-parser');
const express = require('express');
const cbor = require('cbor');
const app = express();

const total = {
  json: 0,
  cbor: 0
};
  
app.post('/json', bodyParser.json(), function ({ headers, body }, res) {
  total.json += parseInt(res.req.headers['content-length']);
  console.log('JSON: ', total.json);
  res.end();
});

app.post('/cbor', bodyParser.json(), function ({ headers, body }, res) {
  total.cbor += parseInt(res.req.headers['content-length']);
  console.log('CBOR: ', total.cbor);
  console.log(body)
  res.end();
});

app.listen(9090);
