const STO = require("enforce-mysql")//"./storage/StorageClass")
const storage = new STO();

const ARC = require("./lib/archiver")
const archiver = new ARC(storage);

archiver.beginMission()

setInterval(() => {
	archiver.saveData({position: {longitude: 234, latitude: 3423, altitude: 32498273}})
}, 1000)
