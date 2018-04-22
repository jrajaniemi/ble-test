var querystring = require('querystring');
var http = require("http");

const postData = querystring.stringify({
	"url": "https://ruu.vi/#BEAYAMech",
	"dataFormat": 4,
	"rssi": -34,
	"humidity": 32,
	"temperature": 24,
	"pressure": 1011,
	"eddystoneId": 133
});

const options = {
  host: 'weather.gim.fi',
  port: 80,
  path: '/123/index.php',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache',
    'Content-Length': Buffer.byteLength(postData)
  }
};

var request: any = http.request(options, (response: any) => {
  console.log('STATUS: '+response.statusCode);
  console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
  response.setEncoding('utf8');
  response.on('data', (chunk: any) => {
    console.log(`BODY: ${chunk}`);
  });
  response.on('end', () => {
    console.log('No more data in response.');
  });
});

request.on('error', (e: any) => {
  console.error(`problem with requestuest: ${e.message}`);
});

// write data to requestuest body
request.write(postData);
request.end();
