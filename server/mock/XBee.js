const {
	EventEmitter
} = require("events")
const debug = require("debug")("mock:xbee")

class XBee extends EventEmitter {
	constructor() {
		super()
		debug("Initialize xbee")
		setInterval(() => {
			this.emit('data', "some random data")
		}, 1000)
		setInterval(() => {
			this.emit("command", "asd0")
		}, 3200)
	}

	send(e, data) {
		debug("sending data")
		// process.stdout.write(`Sending ${e}`);
		// setTimeout(() => {
		// 	process.stdout.write(".")
		// 	setTimeout(() => {
		// 		process.stdout.write(".")
		// 		setTimeout(() => {
		// 			process.stdout.write(". ")
		// 			debug("Woosh!")
		// 		}, 500)
		// 	}, 500)
		// }, 500)
	}
}

module.exports = {
	XBee
}
