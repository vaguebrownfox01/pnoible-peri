const util = require("util");
const bleno = require("bleno");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class StaticInfo {
  constructor({ uuid, uuid_des }) {
    StaticInfo.super_.call(this, {
      uuid,
      properties: ["read"],
      value: Buffer.from("Pnoi-phone", "utf8"),
      descriptors: [
        new BlenoDescriptor({
          uuid: uuid_des,
          value: "Pnoi phone BLE interface",
        }),
      ],
    });
  }
}

util.inherits(StaticInfo, BlenoCharacteristic);

module.exports = { StaticInfo };
