const BME280 = require('./BME280');
const {
  EventEmitter
} = require("events")


class THP extends EventEmitter {
  constructor() {
    super()
    this._on = false
    this.runnig = false
    const options = {
      i2cBusNo: 0,
      i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS()
    }
    this.bme280 = new BME280(options);
    this.bme280.init().then(() => {
        console.log('BME280 initialization succeeded');
        this._on = true
      })
      .catch((err) => console.error(`BME280 initialization failed: ${err} `));
  }

  readSensorData() {
    this.to = setTimeout(() => {
      this.bme280.readSensorData((err, data) => {
        if (err) this.emit("err", err)
        else this.emit("data", data)
        this.readSensorData()
      })
    })
  }

  startReading() {
    if (this._on && !this.runnig)
      this.readSensorData()
  }

  stopReading() {
    if (this._on && this.runnig)
      clearTimeout(this.to)
  }
}

module.exports = THP