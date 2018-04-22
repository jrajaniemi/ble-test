var querystring = require('querystring');
var http = require("http");
var postData = querystring.stringify({
    "url": "https://ruu.vi/#BEAYAMech",
    "dataFormat": 4,
    "rssi": -34,
    "humidity": 32,
    "temperature": 24,
    "pressure": 1011,
    "eddystoneId": 133
});
var options = {
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
var request = http.request(options, function (response) {
    console.log('STATUS: ' + response.statusCode);
    console.log("HEADERS: " + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        console.log("BODY: " + chunk);
    });
    response.on('end', function () {
        console.log('No more data in response.');
    });
});
request.on('error', function (e) {
    console.error("problem with requestuest: " + e.message);
});
request.write(postData);
request.end();
//# sourceMappingURL=http-test.js.map