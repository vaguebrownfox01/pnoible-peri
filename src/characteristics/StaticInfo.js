const util = require("util");
const bleno = require("bleno");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class StaticInfo {
  constructor() {
    StaticInfo.super_.call(this, {
      uuid: "fad2",
      properties: ["read"],
      value: Buffer.from("Pnoi-phone", "utf8"),
      descriptors: [
        new BlenoDescriptor({
          uuid: "fa22",
          value: "Pnoi phone BLE interface",
        }),
      ],
    });
  }
}

util.inherits(StaticInfo, BlenoCharacteristic);

module.exports = { StaticInfo };
