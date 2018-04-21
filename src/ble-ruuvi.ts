const ruuvi = require('node-ruuvitag');
var http = require('http');

let server = {
  host: 'weather.gim.fi',
  port: 80,
  path: '/weather',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength('')
  }
}

const req = http.request(server, (res: any) => {
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

req.on('error', (e: any) => {
  console.error(`problem with request: ${e.message}`);
  
});

function sleep(delay: number) {
  let start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}


ruuvi.on('found', (tag: any) => {
  console.log('Found RuuviTag, id: ' + tag.id);
  tag.on('updated', (data: any) => {
    console.log('Got data from RuuviTag ' + tag.id + '\n' +Date() + ':\n' + JSON.stringify(data, null, '\t'));
    server.headers["Content-Length"] = Buffer.byteLength(data);
    req.write(data);
    req.end();
  });
  sleep(3000);
});
