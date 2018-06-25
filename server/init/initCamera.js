const debug = require("debug")("init")

const CAMERA = require("nanopi-camera")

const init = ({
	camera
}) => {
	debug("Init camera")
	const camera = new CAMERA(camera)

	return camera
}

module.exports = {
	init
}
