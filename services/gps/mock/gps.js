const {
  EventEmitter
} = require("events")
const debug = require("debug")("mock:gps")

class GPS extends EventEmitter {
  constructor(port, delay) {
    super()
    this.delay = (delay && !isNaN(delay)) ? delay : 10000
    this._on = false
    this.running = false
    this.Start()
  }

  Start() {
    try {
      if (!this._on) {
        this._on = true
        this.StartLoop()
        debug("GPS enabled")
      }
    } catch (e) {
      debug(e)
    }
  }

  StartLoop() {
    if (this._on && !this.running) {
      debug("Gps started")
      this.running = true
      this.run()
    }
  }

  run() {
    this.loop = setTimeout(() => {
      this.emit("data", {latitude: 23.0, longitude: 31.34, altitude: 123})
      this.run()
    }, this.delay)
  }

  StopLoop() {
    if (this._on && this.running) {
      debug("Gps stopped")
      clearTimeout(this.loop)
      this.running = false
    }
  }

  close() {
    if (this._on) {
      this._on = false
    }
  }
}

module.exports = GPS
