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
			else this.emit("data", {data: "nom mi ricordo come era l'oggetto"})
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
