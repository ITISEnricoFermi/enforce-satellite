const MOTORS = require("../deps/motors")

const init = (config) => {
	return new MOTORS()
}

module.exports = {
	init
}
