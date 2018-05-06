const {
	EventEmitter
} = require("events")
const line = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
})
const debug = require("debug")("mock:xbee")

class XBee extends EventEmitter {
	constructor() {
		super()
		debug("Initialize xbee")
		line.on("line", line => {
			let c = line.split(" ")
			this.emit(c[0], c[1])
		})
	}

	send(e, data) {
		debug(`Sending ${e}...`)
		debug(`Data: %o`, data)
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
