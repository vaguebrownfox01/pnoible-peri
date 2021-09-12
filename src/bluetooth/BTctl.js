// Import node modules.
const processSpawn = require("child_process").spawn;

// Local private variables.
let childProcess;

class BTctl extends require("events").EventEmitter {
  /**
   * Constructor of AudioRecord class.
   * @param {Object} options Object with optional options variables
   * @param {Object} logger Object with log, warn, and error functions
   * @returns this
   */
  constructor(options = {}, logger) {
    super();

    this.options = Object.assign(
      {
        program: "bluetoothctl", // Which program to use
      },
      options
    );
    this.logger = logger;

    this.command = {
      arguments: [],
      options: {
        encoding: "binary",
        env: process.env,
      },
    };

    if (this.logger) {
      // Log command.
      this.logger.log(
        `Bluetoothctl: Command '${
          this.options.program
        } ${this.command.arguments.join(" ")}'; Options: ENV ${
          this.command.options.env
        }`
      );
    }
    return this;
  }
  /**
   * Creates and starts the audio recording process.
   * @returns this
   */
  start() {
    if (childProcess) {
      if (this.logger) {
        this.logger.warn(
          "Bluetoothctl: Process already active, killed old one started new process."
        );
      }
      childProcess.kill();
    }

    // Create new child process and give the recording commands.
    childProcess = processSpawn(
      this.options.program,
      this.command.arguments,
      this.command.options
    );

    // Store this in `self` so it can be accessed in the callback.
    let self = this;
    childProcess.on("close", function (exitCode) {
      if (self.logger) {
        self.logger.log(`Arecorder: Exit code '${exitCode}'.`);
      }
      self.emit("close", exitCode);
    });

    if (this.logger) {
      this.logger.log("Arecorder: Started recording.");
    }

    return this;
  }
  /**
   * Stops and removes the audio recording process.
   * @returns this
   */
  stop() {
    if (!childProcess) {
      if (this.logger) {
        this.logger.warn(
          "Arecorder: Unable to stop recording, no process active."
        );
      }
      return this;
    }

    childProcess.kill();
    childProcess = null;

    if (this.logger) {
      this.logger.log("Arecorder: Stopped recording.");
    }

    return this;
  }
  /**
   * Get the audio stream of the recording process.
   * @returns The stream.
   */
  stream() {
    if (!childProcess) {
      if (this.logger) {
        this.logger.warn(
          "Bluetoothctl: Unable to retrieve stream, because no process not active. Call the start or resume function first."
        );
      }
      return null;
    }

    return childProcess.stdout;
  }
}

module.exports = { Arecorder };
