const debug = require("debug")("mock:motors")

class MotorsController {
	constructor() {
		debug('Initialize motors')
	}

	getStatusLeft() {
		return Math.random() < .5 ? false : true
	}

	getStatusRight() {
		return Math.random() < .5 ? false : true
	}

	getStatus() {
		return {
			leftMotor: this.getStatusLeft(),
			rightMotor: this.getStatusRight()
		}
	}

	setRight(state) {
		debug('Right motor set to: ' + state)
	}

	setLeft(state) {
		debug('Left motor set to: ' + state)
	}
}

module.exports = MotorsController
