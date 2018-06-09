const debug = require("debug")("mock:motors")

class MotorsController {
	constructor() {
		debug('Initialize motors')
		this.left = false
		this.right = false
	}

	getStatusLeft() {
		return this.left
	}

	getStatusRight() {
		return this.right
	}

	getStatus() {
		return {
			leftMotor: this.getStatusLeft(),
			rightMotor: this.getStatusRight()
		}
	}

	setRight(state) {
		debug('Right motor set to: ' + state)
		this.right = state
	}

	setLeft(state) {
		debug('Left motor set to: ' + state)
		this.left = state
	}
}

module.exports = MotorsController
