const {
	EventEmitter
} = require('events')

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
			this._initImu()
		}
		if (this.SENSORS.gps) {
			this._initGps()
		}

		if (this.SENSORS.thp) {
			this._initThp()
		}
	}

	_initThp() {
		this.thp = sensors.thp
		this.thp.on("data", d => {
			this.emit("temperature", d.temperature_C)
		})
		this.thp.on("data", d => {
			this.emit("humidity", d.humidity)
		})
		this.thp.on("data", d => {
			this.emit("pressure", d.pressure_hPa)
		})
	}

	_initGps() {
		this.gps = sensors.gps
		this.gps.on("data", d => {
			this.emit("position", Object.assign({}, {
				latitude: d.latitude,
				longitude: d.longitude,
				altitude: d.altitude
			}))
			this.emit("rawposition", d)
		})
	}

	_initImu() {
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
				this.gps.StartLoop()
			} else if (state === false) {
				this.gps.StopLoop()
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
