const debug = require("debug")("init")

const CAMERA = require("nanopi-camera")

const init = (cameraConfig) => {
	debug("Init camera")
	const camera = new CAMERA(cameraConfig)

	return camera
}

module.exports = {
	init
}
