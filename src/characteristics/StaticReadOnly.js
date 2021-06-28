const util = require("util");
const bleno = require("bleno");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class StaticReadOnly {
  constructor() {
    StaticReadOnly.super_.call(this, {
      uuid: "fad2",
      properties: ["read"],
      value: Buffer.from("value", "utf8"),
      descriptors: [
        new BlenoDescriptor({
          uuid: "fa22",
          value: "sample value",
        }),
      ],
    });
  }
}

util.inherits(StaticReadOnly, BlenoCharacteristic);

module.exports = { StaticReadOnly };
