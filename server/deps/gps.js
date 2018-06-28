const {
	EventEmitter
} = require("events")
const gps = require("breakout-gps")

class GPS extends EventEmitter {
	constructor(port, delay) {
		super()
		this.port = port
		this.delay = (delay && !isNaN(delay)) ? delay : 10
		this._on = false
		this.running = false
		this.Start()
	}

	Start() {
		try {
			if (!this._on) {
				gps.Start(this.port)
				this._on = true
				this.StartLoop()
				console.log("GPS enabled")
			}
		} catch (e) {
			gps.Stop()
			console.error(e)
		}
	}

	StartLoop() {
		if (this._on && !this.running) {
			this.running = true
			this.run()
		}
	}

	run() {
		this.loop = setTimeout(() => {
			this.emit("data", gps.GetData())
			this.run()
		}, this.delay)
	}

	StopLoop() {
		if (this._on && this.running) {
			clearTimeout(this.loop)
			this.running = false
		}
	}

	close() {
		if (this._on) {
			this._on = false
			gps.Stop()
		}
	}
}

/**
 * @param {string} port
 */
module.exports = GPS

/**
 * @typedef {{ latitude: number, longitude: number, altitude:number, speed: number, course: number }} PositionData
 * @typedef {(err: Error,data: PositionData) => void} GpsCallback
 */
