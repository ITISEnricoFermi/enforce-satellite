let { MoleculerError } = require("moleculer").Errors

const Imu = require("./mock/imu")
const imu = new Imu()

module.exports = {
	name: "imu",
	actions: {
		start(ctx) {
			if(!imu.running) {
				this.logger.info("Starting Imu")
				imu.startReading()
			}
		},
		stop(ctx) {
			if(imu.running) {
				this.logger.info("Stopping Imu")
				imu.stopReading()
			}
		},
	},
	created() {
		this.logger.info("Setting up quaternion event for imu")
		imu.on("quaternion", data => {
			this.broker.broadcast("imu.quaternion", data)
		})
		this.logger.info("Setting up euler event for imu")
		imu.on("euler", data => {
			this.broker.broadcast("imu.euler", data)
		})
	}
}
