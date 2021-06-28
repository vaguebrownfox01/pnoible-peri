const util = require("util");
const bleno = require("bleno");
const { getMic } = require("../record/mic");
const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

// const mic = getMic({
//   device: `plughw:0`, // Recording device to use, e.g. `hw:1,0`
//   format: `S16_LE`, // Encoding type. (only for `arecord`)
//   rate: 16000, // Sample rate.
//   type: `wav`, // Format type.
//   channel: 1,
//   periodTime: 16000,
//   // periodSize: `16`,
//   // duration: 10,
//   // file: "test.wav",
// });

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
        this.mic = getMic({
          device: `plughw:0`, // Recording device to use, e.g. `hw:1,0`
          format: `S16_LE`, // Encoding type. (only for `arecord`)
          rate: 16000, // Sample rate.
          type: `wav`, // Format type.
          channel: 2,
          // periodTime: 16000,
          // periodSize: `16`,
          // duration: 10,
          file: "record.wav",
        });

        let stream = this.mic.start().stream();
        stream.on("data", (d) => {
          let size = Buffer.byteLength(d);
          console.log("data size: ", size);
        });
        // console.log("stream", stream);
        break;
      case "0b":
        this.mic.stop();
        break;
      default:
        console.log("unknown command received");
        break;
    }
    console.log(`command code: ${data.toString("hex")}`);

    callback(this.RESULT_SUCCESS);
  }
}

util.inherits(WriteOnly, BlenoCharacteristic);

module.exports = { WriteOnly };
