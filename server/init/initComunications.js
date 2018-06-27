const XBee = require("module-xbee").XBee
const COMMS = require('../lib/comms')

const defaults = {
	xbee: {
		active: true,
		port: "/dev/ttyS2",
		baudRate: 115200
	}
}

const init = (communicationConfig) => {

	let method = null

	if ("xbee" in communicationConfig && isXbeeActive(communicationConfig)) {
		method = useXbee(communicationConfig)
	}

	const comms = new COMMS(method)

	return comms
}

// Utilities functions
function getBaudRate({
	xbee
}) {
	if ("baudRate" in xbee) {
		return parseInt(xbee.baudRate)
	} else {
		return defaults.xbee.baudRate
	}
}

function getPort({
	xbee
}) {
	if ("port" in xbee) {
		return xbee.port
	} else {
		return defaults.xbee.port
	}
}

function isXbeeActive({
	xbee
}) {
	if ("active" in xbee) {
		return xbee.active
	} else {
		return defaults.xbee.active
	}
}

// USE functions
function useXbee(communicationConfig) {
	// Setup configurations
	const port = getPort(communicationConfig),
		baudRate = getBaudRate(communicationConfig)

	return new XBee(port, baudRate)
}

module.exports = {
	init
}
