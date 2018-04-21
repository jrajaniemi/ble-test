var ruuvi = require("node-ruuvitag");
var querystring = require('querystring');
var http = require("http");
var postData = querystring.stringify({
    'msg': 'Hello World!'
});
var options = {
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
var request = http.request(options, function (res) {
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("BODY: " + chunk);
    });
    res.on('end', function () {
        console.log('No more data in response.');
    });
});
request.on('error', function (e) {
    console.error("problem with requestuest: " + e.message);
});
request.write(postData);
request.end();
//# sourceMappingURL=http-test.js.map