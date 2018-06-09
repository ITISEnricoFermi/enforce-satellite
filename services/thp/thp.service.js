let { MoleculerError } = require("moleculer").Errors;

const Thp = require("./mock/thp");
const thp = new Thp();

module.exports = {
	name: "thp",
	actions: {
		start(ctx) {
			if(!thp.running) {
				this.logger.info("Starting thp");
				thp.startReading();
				return {
					state: "started"
				};
			} else {
				return {
					state: "already running"
				};
			}
		},
		stop(ctx) {
			if(thp.running) {
				this.logger.info("Stoping thp");
				thp.stopReading();
				return {
					state: "stopped"
				};
			} else {
				return {
					state: "thp not runnig"
				};
			}
		}
	},

	events: {
	}
};
