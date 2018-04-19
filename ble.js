// https://f.ruuvi.com/t/reading-measurements-with-raspberry-pi-3-and-node-js-noble/738
var noble = require('noble');
var _ = require('lodash');
var names = {
    '1809': 'Temperature'
};
var myDevices = ['ec:39:31:49:ac:15'];
var found_Devices = [];
var inRange = [];
noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        noble.startScanning([], true);
    }
    else {
        noble.stopScanning();
    }
});
noble.on('discover', function (peripheral) {
    var addr = peripheral.address;
    if (!found_Devices.includes(addr)) {
        found_Devices.push(addr);
        console.log('---------------------');
        console.log("Found - " + addr + " - " + peripheral.advertisement.localName);
    }
    if (myDevices.indexOf(addr) > -1) {
        var id_1 = addr;
        var entered_1 = true;
        _.each(inRange, function (item) {
            if (item.id === id_1) {
                entered_1 = false;
            }
        });
        if (entered_1) {
            var current_peripheral = {
                id: id_1,
                address: addr,
                peripheral: peripheral,
                name: peripheral.advertisement.localName,
                data: {},
                lastSeen: Date.now(),
                rssi: peripheral.rssi
            };
            inRange.push(current_peripheral);
            console.log(peripheral.advertisement.localName + ' - Found!');
            var serviceData = peripheral.advertisement.serviceData;
            if (serviceData && serviceData.length) {
                _.each(serviceData, function (item) {
                    console.log(Date());
                    console.log(peripheral.advertisement.localName + " => " + names[item.uuid.toString()] + " - " + item.data.toString());
                });
                console.log('---------------------');
            }
        }
    }
});
