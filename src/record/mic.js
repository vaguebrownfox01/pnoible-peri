const { Arecorder } = require("./Arecorder");

const options = {
  device: `plughw:0`, // Recording device to use, e.g. `hw:1,0`
  format: `S16_LE`, // Encoding type. (only for `arecord`)
  rate: 8000, // Sample rate.
  type: `wav`, // Format type.
  // duration: 10,
  file: "test.wav",
};

const logger = console;

// Create an instance.
const getMic = (options) => {
  const audioRecorder = new Arecorder(options, logger);
  return audioRecorder;
};

// audioRecorder.start();
// audioRecorder.stop();

module.exports = { getMic };
