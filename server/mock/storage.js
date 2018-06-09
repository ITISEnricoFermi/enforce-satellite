const debug = require("debug")("mock:storage")
class Mock {
	constructor(filename, path) {
		this.path = (path) ? path : "./"
	}

	startMission(missionID) {
		this.mission = missionID
	}

	save(data) {
		if ("humidity" in data) {
			this.saveanimation("humidity")
		} else
		if ("position" in data) {
			this.saveanimation("position")
		} else
		if ("temperature" in data) {
			this.saveanimation("temperature")
		} else
		if ("pressure" in data) {
			this.saveanimation("pressure")
		} else
		if ("orientation" in data) {
			this.saveanimation("orientation")
		} else {
			this.saveanimation("some stuff")
		}
	}

	saveanimation(e) {
		debug(`Saving ${e}`);
	}
}

module.exports = Mock
