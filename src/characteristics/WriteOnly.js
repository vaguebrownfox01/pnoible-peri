const util = require("util");
const bleno = require("bleno");
const { audioRecorder } = require("../record/rec");

const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

class WriteOnly {
  constructor() {
    WriteOnly.super_.call(this, {
      uuid: "fff4",
      properties: ["write", "writeWithoutResponse"],
      descriptors: [
        new BlenoDescriptor({
          uuid: "0004",
          value: "Send commands to execute",
        }),
      ],
    });
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    let command = data.toString("hex");
    switch (command) {
      case "0a":
        audioRecorder.start();
        break;
      case "0b":
        audioRecorder.stop();
        break;
      default:
        console.log("unknown command received");
        break;
    }
    console.log(
      "WriteOnly write request: " +
        data.toString("hex") +
        " " +
        offset +
        " " +
        withoutResponse
    );

    callback(this.RESULT_SUCCESS);
  }
}

util.inherits(WriteOnly, BlenoCharacteristic);

module.exports = { WriteOnly };
