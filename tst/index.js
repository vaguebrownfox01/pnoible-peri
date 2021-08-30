const {Bluetooth} = require("./bluetooth")

const logger = console;

// Create an instance.
const getMic = () => {
	const bluetooth = new Bluetooth(logger);
	return bluetooth;
  };

const bt = getMic();

bt.start();

setTimeout(() => {
	bt.powerOn()
	setTimeout(() => {
		bt.powerOn()
		setTimeout(() => {
			bt.scanOn()
		}, 4000)
	}, 4000)
}, 4000)

