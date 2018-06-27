const debug = require("debug")("init")

const MOTORS = require("../mock/motors")

const init = (motorsConfig) => {
	return new MOTORS()
}

module.exports = {
	init
}
