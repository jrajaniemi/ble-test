// https://f.ruuvi.com/t/reading-measurements-with-raspberry-pi-3-and-node-js-noble/738
const noble = require("noble");
const _ = require("lodash");

const names = {
  "1809": "Temperature"
};

const myDevices = ["ec:39:31:49:ac:15"];
let found_Devices = [];

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

noble.on("stateChange", state => {
  if (state === "poweredOn") {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on("discover", peripheral => {
  let addr = peripheral.address;

  if (myDevices.indexOf(addr) > -1) {
    let id = addr;

    let serviceData = peripheral.advertisement.serviceData;

    if (serviceData && serviceData.length) {
      _.each(serviceData, item => {
        console.log(Date());
        console.log(peripheral.advertisement.localName + ' => ' + names[item.uuid.toString()] + ' - ' + item.data.toString());
      });
      console.log("---------------------");
      sleep(60*1000);
    }
  }
});
