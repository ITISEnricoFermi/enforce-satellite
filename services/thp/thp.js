const BME280 = require("./BME280")
const {
	EventEmitter
} = require("events")


class THP extends EventEmitter {
	constructor(delay) {
		super()
		this.delay = (delay && !isNaN(delay)) ? delay : 0
		this._on = false
		this.running = false
		const options = {
			i2cBusNo: 0,
			i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS()
		}
		this.bme280 = new BME280(options)
		this.bme280.init((err) => {
			if (err) return console.error(`BME280 initialization failed: ${err} `)
			console.log("BME280 initialization succeeded")
			this._on = true
			this.startReading()
		})
	}

	readSensorData() {
		this.to = setTimeout(() => {
			this.bme280.readSensorData((err, data) => {
				if (err) this.emit("err", err)
				else this.emit("data", data)
				this.readSensorData()
			})
		}, this.delay)
	}

	startReading() {
		this.running = true
		this.readSensorData()
	}

	stopReading() {
		this.running = false
		clearTimeout(this.to)
	}
}

module.exports = THP
