let { MoleculerError } = require("moleculer").Errors;

const Thp = require("./mock/thp")
const thp = new Thp()

module.exports = {
	name: "thp",
	actions: {
		start(ctx) {
			if(!thp.running) {
				this.logger.info(`Starting thp`);
				thp.startReading()
			}
		},
	},

	events: {
	}
}
