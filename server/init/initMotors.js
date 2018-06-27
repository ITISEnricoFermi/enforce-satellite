const debug = require("debug")("init")

const MOTORS = require("../mock/motors")

const init = (motorsConfig) => {
	debug("Init motors")
	return new MOTORS()
}

module.exports = {
	init
}
