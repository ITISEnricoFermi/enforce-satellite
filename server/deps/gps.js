const {
  EventEmitter
} = require("events")
const gps = require("node-nan")

class GPS extends EventEmitter {
  constructor(port, delay) {
    super()
    this.port = port
    this.delay = (delay && !isNaN(delay)) ? delay : 0
    this._on = false
    this.running = false
    this.Start()
  }

  Start() {
    try {
      if (!this._on) {
        gps.Start(this.port)
        this._on = true
        console.log("GPS enabled")
        this.StartLoop()
      }
    } catch (e) {
      gps.Stop()
      console.error(e)
    }
  }

  StartLoop() {
    if (this._on && !this.running) {
      this.running = true
      this.loop = setTimeout(() => {
        this.emit("data", gps.GetData())
        this.StartLoop()
      }, this.delay)
    }
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