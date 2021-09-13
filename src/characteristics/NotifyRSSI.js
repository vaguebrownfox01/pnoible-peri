const util = require("util");
const bleno = require("bleno");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class NotifyRSSI {
  constructor({ uuid, uuid_des }) {
    NotifyRSSI.super_.call(this, {
      uuid,
      properties: ["notify"],
      descriptors: [
        new BlenoDescriptor({
          uuid: uuid_des,
          value: "Notify rssi to client",
        }),
      ],
    });
  }
  onSubscribe(_, updateValueCallback) {
    console.log("NotifyRSSI subscribe");

    this.rssi = 0;
    this.changeInterval = setInterval(
      function () {
        var data = Buffer.alloc(4);
        data.writeFloatBE(this.rssi);
        console.log("NotifyRSSI update value: " + this.rssi);
        updateValueCallback(data);
        bleno.updateRssi((err, rssi) => (this.rssi = err ? 0 : rssi));
      }.bind(this),
      500
    );
  }
  onUnsubscribe() {
    console.log("NotifyRSSI unsubscribe");

    if (this.changeInterval) {
      clearInterval(this.changeInterval);
      this.changeInterval = null;
    }
  }
  onNotify() {
    console.log("NotifyRSSI on notify");
  }
}

util.inherits(NotifyRSSI, BlenoCharacteristic);

module.exports = { NotifyRSSI };

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
