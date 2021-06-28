// Import node modules.
const processSpawn = require("child_process").spawn;

// Local private variables.
let childProcess;

class Arecorder extends require("events").EventEmitter {
  /**
   * Constructor of AudioRecord class.
   * @param {Object} options Object with optional options variables
   * @param {Object} logger Object with log, warn, and error functions
   * @returns this
   */
  constructor(options = {}, logger) {
    super();

    // For the `rec` and `sox` only options the default is applied if a more general option is not specified.
    this.options = Object.assign(
      {
        program: "arecord", // Which program to use, either `arecord`, `rec`, and `sox`.
        device: null, // Recording device to use.
        driver: null, // Recording driver to use.

        channels: 2, // Channel count.
        format: "S16_LE", // Format type. (only for `arecord`)
        rate: 16000, // Sample rate.
        type: "wav", // File type.

        duration: null,
        file: null, //`test.${this.type}`,
        periodSize: null,
        periodTime: null,
      },
      options
    );
    this.logger = logger;

    this.command = {
      arguments: [
        // Show no progress
        "-q",
        // Channel count
        "-c",
        this.options.channels.toString(),
        // Sample rate
        "-r",
        this.options.rate.toString(),
        // Format type
        "-t",
        this.options.type,
        // "-I",
      ],
      options: {
        encoding: "binary",
        env: process.env,
      },
    };
    switch (this.options.program) {
      default:
      case "arecord":
        if (this.options.device) {
          this.command.arguments.unshift("-D", this.options.device);
        }
        this.command.arguments.push(
          // Format type
          "-f",
          this.options.format
        );
        if (this.options.duration) {
          this.command.arguments.push("-d", `${this.options.duration}`);
        }
        if (this.options.periodTime) {
          this.command.arguments.push(
            `--period-time=${this.options.periodTime}`
          );
        }
        if (this.options.periodSize) {
          this.command.arguments.push(
            `--period-size=${this.options.periodSize}`
          );
        }
        if (this.options.file) {
          this.command.arguments.push(this.options.file);
        }

        break;
    }

    if (this.logger) {
      // Log command.
      this.logger.log(
        `Arecorder: Command '${
          this.options.program
        } ${this.command.arguments.join(" ")}'; Options: AUDIODEV ${
          this.command.options.env.AUDIODEV
            ? this.command.options.env.AUDIODEV
            : "(default)"
        }, AUDIODRIVER: ${
          this.command.options.env.AUDIODRIVER
            ? this.command.options.env.AUDIODRIVER
            : "(default)"
        };`
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
          "Arecorder: Process already active, killed old one started new process."
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
          "Arecorder: Unable to retrieve stream, because no process not active. Call the start or resume function first."
        );
      }
      return null;
    }

    return childProcess.stdout;
  }
}

module.exports = { Arecorder };
