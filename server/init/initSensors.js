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

const init = (sensors) => {

	let gps = null,
			imu = null,
			thp = null

	if ("gps" in sensors) {
		gps = getGps(sensors)
	}

	if ("imu" in sensors) {
		imu = getImu(sensors)
	}

	if ("thp" in sensors) {
		thp = getThp(sensors)
	}

	const sens = new SENSORS({
		thp,
		imu,
		gps
	})

	return sens
}

function getBus(what, conf) {
	if("bus" in conf)  {
		return conf.bus
	} else {
		return defaults[what].bus
	}
}

function getDelay(what, conf) {
	if("delay" in conf)  {
		return conf.delay
	} else {
		return defaults[what].delay
	}
}

function getGps({gps}) {
	debug("Init gps")
	const bus = getBus("gps", gps)
	const delay = getDelay("gps", gps)

	return new GPS(bus, delay)
}

function getImu({imu}) {
	debug("Init imu")
	const bus = getBus("imu", imu)
	const delay = getDelay("imu", imu)

	return new IMU(bus, delay)
}

function getThp({thp}) {
	debug("Init thp")
	const delay = getDelay("thp", thp)
	return new THP(delay)
}

module.exports = {
	init
}
