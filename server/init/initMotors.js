const MOTORS = require("../mock/motors")

const init = (config) => {
	return new MOTORS()
}

module.exports = {
	init
}
