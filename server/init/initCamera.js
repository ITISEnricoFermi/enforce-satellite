const CAMERA = require("nanopi-camera")

const init = (config) => {
	return new CAMERA(config)
}

module.exports = {
	init
}
