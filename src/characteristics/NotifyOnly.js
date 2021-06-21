const util = require("util");
const bleno = require("bleno");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class NotifyOnly {
  constructor() {
    NotifyOnly.super_.call(this, {
      uuid: "fff5",
      properties: ["notify"],
    });
  }
  onSubscribe(maxValueSize, updateValueCallback) {
    console.log("NotifyOnly subscribe");

    this.rssi = 0;
    this.changeInterval = setInterval(
      function () {
        var data = Buffer.alloc(4);
        console.log(typeof this.rssi);
        data.writeFloatBE(this.rssi);

        console.log("NotifyOnly update value: " + this.rssi);
        updateValueCallback(data);
        bleno.updateRssi((err, rssi) => (this.rssi = err ? 0 : rssi));
      }.bind(this),
      1000
    );
  }
  onUnsubscribe() {
    console.log("NotifyOnly unsubscribe");

    if (this.changeInterval) {
      clearInterval(this.changeInterval);
      this.changeInterval = null;
    }
  }
  onNotify() {
    console.log("NotifyOnly on notify");
  }
}

util.inherits(NotifyOnly, BlenoCharacteristic);

module.exports = { NotifyOnly };

// navigator.bluetooth
//   .requestDevice({ acceptAllDevices: true, optionalServices: [0x1804] })
//   .then((dev) => {
//     d = dev;
//     console.log("dev: ", dev);
//     return dev.gatt.connect();
//   })
//   .then((ser) => {
//     s = ser;
//     console.log("ser: ", ser);
//     return ser.getPrimaryServices(0x1804);
//   })
//   .then((sers) => {
//     ss = sers[0];
//     console.log("sers: ", sers);
//     return ss.getCharacteristic(0x2a06);
//   })
//   .then((cha) => {
//     c = cha;
//     console.log("cha: ", cha);
//   })
//   .catch((e) => {
//     console.log("error: ", e);
//   });
