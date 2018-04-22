var ruuvi = require('node-ruuvitag');
ruuvi.on('found', function (tag) {
    console.log('Found RuuviTag, id: ' + tag.id);
    tag.on('updated', function (data) {
        console.log('Got data from RuuviTag ' + tag.id + ':\n' +
            JSON.stringify(data, null, '\t'));
    });
});
//# sourceMappingURL=ble-ruuvi.js.map