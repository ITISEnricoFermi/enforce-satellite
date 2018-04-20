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
        storage.save(dataType, dataObject, this.missionId)
    }
}