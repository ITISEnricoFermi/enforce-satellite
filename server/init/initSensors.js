const debug = require("debug")("init")

const IMU = require("../mock/imu")
const THP = require("../mock/thp")
const GPS = require("../mock/gps")

const init = (config) => {
	debug("Init gps")
	const gps = new GPS(config.gps || "/dev/ttyS1")

	debug("Init thp")
	const thp = new THP()

	debug("Init imu")
	const imu = new IMU(null)

	const sensors = new SENSORS({
		thp,
		imu,
		gps
	})

	return sensors
}

module.exports = {
	init
}
