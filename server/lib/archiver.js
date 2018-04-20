class Archiver {
    constructor(storage) {
        this.storage = storage
        this.missionId = null
    }

    beginMission() {
        this.missionId = Date.now()
    }

    endMission() {
        this.missionId = null
    }

    saveData(dataType, dataObject) {
        if (this.missionId === null) return
        this.storage.save(dataType, dataObject, this.missionId)
    }
}

module.exports = Archiver