var ruuvi = require('node-ruuvitag');
var http = require('http');
var server = {
    host: 'weather.gim.fi',
    port: 80,
    path: '/weather',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength('')
    }
};
var req = http.request(server, function (res) {
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
req.on('error', function (e) {
    console.error("problem with request: " + e.message);
});
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay)
        ;
}
ruuvi.on('found', function (tag) {
    console.log('Found RuuviTag, id: ' + tag.id);
    tag.on('updated', function (data) {
        server.headers["Content-Length"] = Buffer.byteLength(data);
        req.write(data);
        req.end();
        console.log('Got data from RuuviTag ' + tag.id + '\n' + Date() + ':\n' + JSON.stringify(data, null, '\t'));
    });
    sleep(3000);
});
//# sourceMappingURL=ble-ruuvi.js.map