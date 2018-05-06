const {
	EventEmitter
} = require("events")


class THP extends EventEmitter {
	constructor(delay) {
		super()
		this.delay = (delay && !isNaN(delay)) ? delay : 6000
		this.startReading()
	}

	readSensorData() {
		this.to = setTimeout((err) => {
			if (err) this.emit("err", err)
			// TODO: inviare l'oggetto giusto
			else this.emit("data", {
				temperature_C: Math.random() * 20 + 15,
				humidity: Math.random() * 99 + 1,
				pressure_hPa: Math.random() * 1000 + Math.random() * 10 + 5
			})
			this.readSensorData()
		}, this.delay)
	}

	startReading() {
		this.readSensorData()
	}

	stopReading() {
		clearTimeout(this.to)
	}
}

module.exports = THP
