const {
	EventEmitter
} = require("events")

/**
 * @description Wrapper for XBee module
 */
class Comms extends EventEmitter {
	constructor(xbee) {
		super()
		if (!xbee) throw new Error(`"xbee is not defined."`)
		this.xbee = xbee;
		this.xbee.on("data", d => this.emit("data", d))
		this.xbee.on("command", c => this.emit("command", c))
	}

	/**
	 * @param {DataType} dataType
	 * @param {DATA} data
	 */
	send(dataType, data) {
		this.xbee.send(dataType, data)
	}

	/**
	 * @description NEVER EVER USE THIS METHOD IN PRODUCTION
	 */
	stop() {
		this.xbee = null
	}
}

module.exports = Comms

/**
 * @typedef {"position" | "temperature" | "orientation" | "humidity" | "pressure" | "target" | "status" | "command"} DataType
 * @typedef {any} DATA
 */
