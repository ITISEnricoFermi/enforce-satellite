class Pilot {
	constructor(motors) {
		this.motors = motors
		this.config = {
			autopilotEnabled: false,
			updateInterval: 100,
			debugEnabled: false
		}
	}

	setDebug(state) {
		this.config.debugEnabled = state
	}

	enableAutopilot(targeter) {
		this.targeter = targeter
		this.config.autopilotEnabled = true
		this.update = setInterval(() => {
			const direction = this.targeter.getTurnDirection()
			switch (direction) {
				case 1:
					this.turnRight()
					break
				case 0:
					this.stopTurning()
					break
				case -1:
					this.turnLeft()
					break
			}
		}, this.config.updateInterval)
	}

	disableAutopilot() {
		clearInterval(this.update)
		this.config.autopilotEnabled = false
	}

	turnLeft() {
		if (this.config.debugEnabled) console.log('Turning left')
		this.motors.setRight(false)
		this.motors.setLeft(true)
	}

	turnRight() {
		if (this.config.debugEnabled) console.log('Turning right')
		this.motors.setRight(true)
		this.motors.setLeft(false)
	}

	stopTurning() {
		if (this.config.debugEnabled) console.log('Turning stopped')
		this.motors.setRight(false)
		this.motors.setLeft(false)
	}

	startBreaking() {
		if (this.config.debugEnabled) console.log('Breaking')
		this.motors.setRight(true)
		this.motors.setLeft(true)
	}

	status() {
		return {
			pilot: this.config.autopilotEnabled
		}
	}
}

module.exports = Pilot
