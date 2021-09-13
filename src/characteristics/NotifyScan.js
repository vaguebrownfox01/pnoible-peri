const util = require("util");
const bleno = require("bleno");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class NotifyScan {
  constructor({ uuid, uuid_des }) {
    NotifyScan.super_.call(this, {
      uuid,
      properties: ["notify"],
      descriptors: [
        new BlenoDescriptor({
          uuid: uuid_des,
          value: "Notify scanned devices to client",
        }),
      ],
    });
  }
  onSubscribe(_, updateValueCallback) {
    console.log("NotifyScan subscribe");
    this.devices = [
      {
        name: "Device 1",
        address: "11:22:33",
      },
      {
        name: "Device 2",
        address: "44:55:66",
      },
    ];
    this.changeInterval = setInterval(
      function () {
        let data = JSON.stringify(devices);
        console.log("NotifyScan update value: " + data);
        updateValueCallback(data);
      }.bind(this),
      2000
    );
  }
  onUnsubscribe() {
    console.log("NotifyScan unsubscribe");

    if (this.changeInterval) {
      clearInterval(this.changeInterval);
      this.changeInterval = null;
    }
  }
  onNotify() {
    console.log("NotifyScan on notify");
  }
}

util.inherits(NotifyScan, BlenoCharacteristic);

module.exports = { NotifyScan };
