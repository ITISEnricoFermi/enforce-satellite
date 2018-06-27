const debug = require("debug")("init")

const CAMERA = require("nanopi-camera")

const init = (cameraConfig) => {
	return new CAMERA(cameraConfig)
}

module.exports = {
	init
}
