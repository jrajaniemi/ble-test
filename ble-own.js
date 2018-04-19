// https://f.ruuvi.com/t/reading-measurements-with-raspberry-pi-3-and-node-js-noble/738
var noble = require("noble");
var _ = require("lodash");
var names = {
    "1809": "Temperature"
};
var myDevices = ["ec:39:31:49:ac:15"];
var found_Devices = [];
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay)
        ;
}
noble.on("stateChange", function (state) {
    if (state === "poweredOn") {
        noble.startScanning([], true);
    }
    else {
        noble.stopScanning();
    }
});
noble.on("discover", function (peripheral) {
    var addr = peripheral.address;
    if (myDevices.indexOf(addr) > -1) {
        var id = addr;
        var serviceData = peripheral.advertisement.serviceData;
        if (serviceData && serviceData.length) {
            _.each(serviceData, function (item) {
                console.log(Date());
                console.log(peripheral.advertisement.localName + ' => ' + names[item.uuid.toString()] + ' - ' + item.data.toString());
            });
            console.log("---------------------");
            sleep(60 * 1000);
        }
    }
});
