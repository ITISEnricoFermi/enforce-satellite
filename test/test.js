const STO = require("enforce-mysql")//"./storage/StorageClass")
const storage = new STO();

const ARC = require("../server/lib/archiver")
const archiver = new ARC(storage);

archiver.beginMission()

setInterval(() => {
	archiver.saveData({position: {longitude: 24, latitude: 15, altitude: 25}})
}, 1000)
