import http from "k6/http";
import { check, group } from "k6";
import CBOR from './node_modules/cbor-js/cbor.js';

const json = { simple: 'test' };
const cbor = CBOR.encode(json);

export default function() {
  group("JSON", function() {
    let res = http.post(`http://127.0.0.1:9090/json`, json);

    check(res, {
      "status is 200": r => r.status === 200
    });
  });

  group("CBOR", function() {
    let res = http.post(`http://127.0.0.1:9090/cbor`, { cbor });

    check(res, {
      "status is 200": r => r.status === 200
    });
  });
};
