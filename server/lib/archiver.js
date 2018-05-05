class Archiver {
	constructor(storage) {
		this.storage = storage
		this.missionId = null

		this.timestamps = []
		this.cooldown = 50
	}

	beginMission() {
		this.missionId = Date.now()
		this.storage.startMission(this.missionId)
	}

	endMission() {
		this.missionId = null
	}

	saveData(data) {
		if (this.missionId === null) return

		data = Object.assign(data, {missionID: this.missionId})
		this.storage.save(data)
	}
}

module.exports = Archiver
