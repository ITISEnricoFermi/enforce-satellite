const debug = require("debug")("init")

const IMU = require("../mock/imu")
const THP = require("../mock/thp")
const GPS = require("../mock/gps")

const SENSORS = require('../lib/sensors')

const defaults = Object.freeze({
	imu: {
		bus: "/dev/i2c-0",
		delay: 10						// in ms
	},
	thp: {
		delay: 10						// im ms
	},
	gps: {
		bus: "/dev/ttyS1",
		delay: 10
	}
})

const init = (config) => {
	debug("Init gps")
	const gps = new GPS(defaults.gps.bus, defaults.gps.delay)

	debug("Init thp")
	const thp = new THP(defaults.thp.delay)

	debug("Init imu")
	const imu = new IMU(defaults.imu.bus, defaults.imu.delay)

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
