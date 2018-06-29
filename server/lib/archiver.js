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

		if (!this.timestamps[dataType]) this.timestamps[dataType] = Date.now()
		else if (Date.now() - this.timestamps[dataType] < this.cooldown) return Promise.resolve()
		else this.timestamps[dataType] = Date.now()

		return new Promise((resolve, reject) => {
			data = Object.assign(data, {
				missionID: this.missionId
			})
			this.storage.save(data)
			resolve()
		})
	}
}

module.exports = Archiver
