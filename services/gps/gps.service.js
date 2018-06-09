let { MoleculerError } = require("moleculer").Errors;

const Gps = require("./mock/gps")
const gps = new Gps(process.env.GPSPORT)

module.exports = {
	name: "gps",
	actions: {
		start(ctx) {
			if(!gps.running) {
				this.logger.info(`Starting Gps`);
				gps.StartLoop()
			}
		}
	},

	events: {
	}
}
