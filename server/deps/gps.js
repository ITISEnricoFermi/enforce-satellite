const {
  EventEmitter
} = require("events")
const gps = require("node-nan")

class GPS extends EventEmitter {
  constructor(port) {
    super()
    this.port = port
    this._on = false
    this.running = false
    this.Start()
  }

  Start() {
    try {
      if (!this._on) {
        gps.Start(this.port)
        this._on = true
      }
    } catch (e) {
      gps.Stop()
      console.error(e)
    }
  }

  StartLoop() {
    if (this.on && !this.running) {
      this.loop = setTimeout(() => {
        this.emit("data", gps.GetData())
        this.StartLoop()
      }, 0)
    }
  }

  StopLoop() {
    if (this._on && this.running)
      clearTimeout(this.loop)
  }

  /**
   * @returns {PositionData}
   */
  getData() {
    let data = gps.GetData()
    this.emit("data", data)
    return data
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