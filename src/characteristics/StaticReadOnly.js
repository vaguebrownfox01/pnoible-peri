const util = require("util");
const bleno = require("bleno");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class StaticReadOnly {
  constructor() {
    StaticReadOnly.super_.call(this, {
      uuid: "fff1",
      properties: ["read"],
      value: Buffer.from("value", "utf8"),
      descriptors: [
        new BlenoDescriptor({
          uuid: "2901",
          value: "sample value",
        }),
      ],
    });
  }
}

util.inherits(StaticReadOnly, BlenoCharacteristic);

module.exports = { StaticReadOnly };
