const {
	EventEmitter
} = require('events')
const debug = require("debug")("mock:imu")

class IMU extends EventEmitter {
	constructor() {
		super()
		debug("Initialize imu")
		this.enabled = false
		this.delay = 4000
		setTimeout(() => {
			this.enabled = true
			debug('imu enabled')
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
			}, this.delay), 0)
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
			}, this.delay), 0)
	}

	startReading() {
		debug("Start reading")
		this.checkQuaternion()
		this.checkEuler()
	}

	stopReading() {
		debug("Stop reading")
		clearTimeout(this.quaternionChecker)
		clearTimeout(this.eulerChecker)
	}
}

module.exports = IMU
