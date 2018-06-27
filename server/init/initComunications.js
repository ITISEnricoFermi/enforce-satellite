const debug = require("debug")("init")

const XBee = require("../mock/XBee").XBee
const COMMS = require('../lib/comms')

const defaults = {
	xbee: {
		active: true,
		port: "/dev/ttyS2",
		baudRate: 115200
	}
}

const init = (communication) => {

	let method = null

	if ("xbee" in communication && isXbeeActive(communication)) {
		method = useXbee(communication)
	}

	debug("Init comunication")
	const comms = new COMMS(method)

	return comms
}

// Utilities functions
function getBaudRate({xbee}) {
	if ("baudRate" in xbee) {
		return parseInt(xbee.baudRate)
	} else {
		return defaults.xbee.baudRate
	}
}

function getPort({xbee}) {
	if ("port" in xbee) {
		return xbee.port
	} else {
		return defaults.xbee.port
	}
}

function isXbeeActive({xbee}) {
	if ("active" in xbee) {
		return xbee.active
	} else {
		return defaults.xbee.active
	}
}

// USE functions
function useXbee(communication) {
	debug("Init xbee")
	// Setup configurations
	const port = getPort(communication),
				baudRate = getBaudRate(communication)

	return new XBee(port, baudRate)
}

module.exports = {
	init
}
