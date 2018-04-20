// https://f.ruuvi.com/t/reading-measurements-with-raspberry-pi-3-and-node-js-noble/738
const noble = require('noble');
const _ = require('lodash');

const names = {
    '1809': 'Temperature'
};

const myDevices = ['ec:39:31:49:ac:15'];
let found_Devices = [];

let inRange = [];

noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        noble.startScanning([], true);
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', (peripheral) => {
    let addr = peripheral.address;
    if (!found_Devices.includes(addr)) {
        found_Devices.push(addr);
        console.log('---------------------');
        console.log(`Found - ${addr} - ${peripheral.advertisement.localName}`);
    }
    if (myDevices.indexOf(addr) > -1) {
        let id = addr;
        let entered = true;

        _.each(inRange, (item) => {
            if (item.id === id) {
                entered = false;
            }
        });

        if (entered) {
            let current_peripheral = {
                id: id,
                address: addr,
                peripheral: peripheral,
                name: peripheral.advertisement.localName,
                data: {},
                lastSeen: Date.now(),
                rssi: peripheral.rssi
            };
            inRange.push(current_peripheral);

            console.log(peripheral.advertisement.localName + ' - Found!');

            let serviceData = peripheral.advertisement.serviceData;

            if (serviceData && serviceData.length) {

                _.each(serviceData, (item) => {
                    console.log(Date());
                    console.log(`${peripheral.advertisement.localName} => ${names[item.uuid.toString()]} - ${item.data.toString()}`);
                });
                console.log('---------------------');
            }
        }
    }
});