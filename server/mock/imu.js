const {
	EventEmitter
} = require('events')
const debug = require("debug")("mock:imu")

class IMU extends EventEmitter {
	constructor() {
		super()
		debug("Initialize imu")
		this.running = false
		this.delay = 4000
		setTimeout(() => {
			debug('imu enabled')
			this.startReading()
		}, 100)
	}

	checkQuaternion() {
		debug("Check quaternion")
		this.quaternionChecker = setTimeout(() =>
			setTimeout((error, data) => {
				this.emit('quaternion', {
					x: Math.random(),
					y: Math.random(),
					z: Math.random(),
					w: Math.random()
				})
				this.checkQuaternion()
			}, 0), this.delay)
	}

	checkEuler() {
		debug("Check euler")
		this.eulerChecker = setTimeout(() =>
			setTimeout((error, data) => {
				this.emit('euler', {
					pitch: Math.random() * 360 - 180,
					roll: Math.random() * 180 - 90,
					heading: Math.random() * 360
				})
				this.checkEuler()
			}, 0), this.delay)
	}

	startReading() {
		debug("Start reading")
		this.running = true
		this.checkQuaternion()
		this.checkEuler()
	}

	stopReading() {
		debug("Stop reading")
		this.running = false
		clearTimeout(this.quaternionChecker)
		clearTimeout(this.eulerChecker)
	}
}

module.exports = IMU
