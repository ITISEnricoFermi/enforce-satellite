let { MoleculerError } = require("moleculer").Errors;

const Imu = require("./mock/imu")
const imu = new Imu()

module.exports = {
	name: "imu",
	actions: {
		start(ctx) {
			if(!imu.running) {
				this.logger.info(`Starting Imu`);
				imu.startReading()
			}
		},
	},

	events: {
	}
}
