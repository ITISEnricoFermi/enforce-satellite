const debug = require("debug")("init")

const CAMERA = require("nanopi-camera")

const init = (config) => {
	debug("Init camera")
	const camera = new CAMERA(config)

	return camera
}

module.exports = {
	init
}
