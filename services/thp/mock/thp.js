const {
	EventEmitter
} = require("events");
const debug = require("debug")("mock:thp");


class THP extends EventEmitter {
	constructor(delay) {
		super();
		debug("Initialize thp");
		this.delay = (delay && !isNaN(delay)) ? delay : 6000;
		this.running = false;
		this.startReading();
	}

	readSensorData() {
		this.to = setTimeout((err) => {
			debug("Reading data");
			if (err) this.emit("err", err);
			// TODO: inviare l'oggetto giusto
			else this.emit("data", {
				temperature_C: Math.random() * 20 + 15,
				humidity: Math.random() * 99 + 1,
				pressure_hPa: Math.random() * 1000 + Math.random() * 10 + 5
			});
			this.readSensorData();
		}, this.delay);
	}

	startReading() {
		debug("Start reading");
		this.running = true;
		this.readSensorData();
	}

	stopReading() {
		debug("Stop reading");
		this.running = false;
		clearTimeout(this.to);
	}
}

module.exports = THP;
