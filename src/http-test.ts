var ruuvi = require("node-ruuvitag");
var querystring = require('querystring');
var http = require("http");

const postData = querystring.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: 'weather.gim.fi',
  port: 80,
  path: '/123/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Length': Buffer.byteLength(postData)
  }
};

var request: any = http.request(options, (res: any) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk: any) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

request.on('error', (e: any) => {
  console.error(`problem with requestuest: ${e.message}`);
});

// write data to requestuest body
request.write(postData);
request.end();