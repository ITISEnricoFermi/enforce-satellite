const debug = require("debug")("init")

const MOTORS = require("../mock/motors")

const init = (config) => {
	debug("Init motors")
	return new MOTORS()
}

module.exports = {
	init
}
