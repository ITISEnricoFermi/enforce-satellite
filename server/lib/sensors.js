const {
	EventEmitter
} = require('events')

function calculateAltitudeMeters(pressure_hPa, seaLevelPressure_hPa) {
	if (!seaLevelPressure_hPa) {
		seaLevelPressure_hPa = 1013.25;
	}

	return (1.0 - Math.pow(pressure_hPa / seaLevelPressure_hPa, (1 / 5.2553))) * 145366.45 * 0.3048;
}

class Sensors extends EventEmitter {
	/**
	 * @param {{imu: any, gps: any, thp: any}} sensors
	 */
	constructor(sensors) {
		super()

		this.SENSORS = {
			gps: false,
			imu: false,
			thp: false
		}

		this.SENSORS.gps = sensors.hasOwnProperty("gps")
		this.SENSORS.imu = sensors.hasOwnProperty("imu")
		this.SENSORS.thp = sensors.hasOwnProperty("thp")

		if (this.SENSORS.imu) {
			this._initImu(sensors)
		}
		if (this.SENSORS.gps) {
			this._initGps(sensors)
		}
		if (this.SENSORS.thp) {
			this._initThp(sensors)
		}

		this.currentAltitude = 0
		this.timestamp = 0
		this.cooldown = 50
	}

	_initThp(sensors) {
		this.thp = sensors.thp
		this.thp.on("data", d => {
			this.emit("temperature", d.temperature_C)
			this.emit("humidity", d.humidity)
			this.emit("pressure", d.pressure_hPa)
			this.currentAltitude = calculateAltitudeMeters(d.pressure_hPa)
		})
	}

	_initGps(sensors) {
		this.gps = sensors.gps
		this.gps.on("data", d => {

			if (Date.now() - this.timestamp < this.cooldown) return
			this.timestamp = Date.now()

			this.emit("position", {
				latitude: d.latitude,
				longitude: d.longitude,
				altitude: d.altitude === 0 ? this.currentAltitude : d.altitude
			})
			this.emit("rawgps", d)
		})
	}

	_initImu(sensors) {
		this.imu = sensors.imu
		this.imu.on('quaternion', (data) => {
			this.emit('quaternion', data)
		})
		this.imu.on('euler', (data) => {
			this.emit('euler', data)
		})
	}

	status() {
		return {
			gps: this.gps.running,
			imu: this.imu.running,
			thp: this.thp.running
		}
	}

	setGps(state) {
		if (this.SENSORS.gps) {
			if (state === true) {
				this.gps.start()
			} else if (state === false) {
				this.gps.stop()
			} else {
				debug(state + " is not a valid state")
			}
		}
	}

	setImu(state) {
		if (this.SENSORS.imu) {
			if (state === true) {
				this.imu.startReading()
			} else if (state === false) {
				this.imu.stopReading()
			} else {
				debug(state + " is not a valid state")
			}
		}
	}

	setThp(state) {
		if (this.SENSORS.thp) {
			if (state === true) {
				this.thp.startReading()
			} else if (state === false) {
				this.thp.stopReading()
			} else {
				debug(state + " is not a valid state")
			}
		}
	}

	stopAll() {
		this.setThp(false)
		this.setImu(false)
		this.setGps(false)
	}
}

/**
 * @param {{gps, imu}} sensors
 */
module.exports = Sensors
