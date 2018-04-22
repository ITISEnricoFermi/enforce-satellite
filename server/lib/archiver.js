class Archiver {
    constructor(storage) {
        this.storage = storage
        this.missionId = null

        this.timestamps = []
        this.cooldown = 100
    }

    beginMission() {
        this.missionId = Date.now()
    }

    endMission() {
        this.missionId = null
    }

    saveData(dataType, dataObject) {
        if (this.missionId === null) return

        if (!this.timestamps[dataType]) this.timestamps[dataType] = Date.now()
        else if (Date.now() - this.timestamps[dataType] < this.cooldown) return
        else this.timestamps[dataType] = Date.now()

        this.storage.save(dataType, dataObject, this.missionId)
    }
}

module.exports = Archiver