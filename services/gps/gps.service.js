let { MoleculerError } = require("moleculer").Errors

const Gps = require("./mock/gps")
const gps = new Gps(process.env.GPSPORT)

module.exports = {
	name: "gps",
	actions: {
		start(ctx) {
			if(!gps.running) {
				this.logger.info("Starting Gps")
				gps.StartLoop()
			}
		},
		stop(ctx) {
			if(gps.running) {
				this.logger.info("Stopping gps")
				gps.StopLoop()
			}
		}
	},
	created() {
		this.logger.info("Setting up data event for gps")
		gps.on("data", data => {
			this.broker.broadcast("gps.data", data)
		})
	}
}
