// Import node modules.
const processSpawn = require("child_process").spawn;
var ransi = require('strip-ansi');
// Local private variables.
let childProcess;


class Bluetooth extends require("events").EventEmitter {

	constructor(logger) {
		super();

		this.logger = logger;

		if (this.logger) {
			this.logger.log(`Bluetooth init`)
		}
	}

	start() {
		if (childProcess) {
			if (this.logger) {

				this.logger.warn(
					"Bluetoothctl: Process already active, killed old one started new process."
				  );
			}
			childProcess.kill();
		}

		childProcess = processSpawn("bluetoothctl")
		// this.logger.log("new bluetoothctl process stdin\n", childProcess.stdin);

		// Store this in `self` so it can be accessed in the callback.
		let self = this;

		childProcess.stdout.on("data", (data) => {
			// let d = ransi(data)
			// d = d.toString("utf8")
			// d = d.replace("[bluetooth]#", "");
			this.logger.log(`stdout`, `$$$start${data}$$$end`);
		})
		
		// Close event
		childProcess.on("close", function (exitCode) {
		  if (self.logger) {
			self.logger.log(`Bluetoothctl: Exit code '${exitCode}'.`);
		  }
		  self.emit("close", exitCode);
		});

		if (this.logger) {
			this.logger.log("Bluetoothctl: Started");
		}
	}

	powerOn() {
		if (!this.check("power on")) return this

		  childProcess.stdin.write("power on\r");
	}

	devices() {
		
		if (!this.check("list devices")) return this
		

		childProcess.stdin.write("devices\r");
	}

	scanOn() {
		if (!this.check("scan on")) return this

		childProcess.stdin.write("scan on\r");
	}


	check(message) {
		if (!childProcess) {
			if (this.logger) {
			  this.logger.warn(
				`Bluetoothctl: Unable to ${message}, no process active`
			  );
			}
			return false;
		  }
		  else {
			  return true
		  }
	}

}

module.exports = {Bluetooth}