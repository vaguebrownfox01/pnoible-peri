// Import module.
const { Arecorder } = require("./Arecorder");

// Options is an optional parameter for the constructor call.
// If an option is not given the default value, as seen below, will be used.
const options = {
  device: `plughw:0`, // Recording device to use, e.g. `hw:1,0`
  format: `S16_LE`, // Encoding type. (only for `arecord`)
  rate: 8000, // Sample rate.
  type: `wav`, // Format type.
  duration: 10,
  file: "test.wav",
};
// Optional parameter intended for debugging.
// The object has to implement a log and warn function.
const logger = console;

// Create an instance.
const audioRecorder = new Arecorder(options, logger);

// audioRecorder.start();
// audioRecorder.stop();

module.exports = { audioRecorder };
