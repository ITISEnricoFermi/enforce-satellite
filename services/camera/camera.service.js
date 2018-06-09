let { MoleculerError } = require("moleculer").Errors;

const Camera = require("./mock/camera")
const camera = new Camera()

module.exports = {
	name: "camera",
	actions: {
		start(ctx) {
			if(!camera.isRunning()) {
				this.logger.info(`Starting Camera`);
				camera.start()
			}
		},
	},

	events: {
	}
}
