const {
  EventEmitter
} = require("events")
const gps = require("node-nan")

class Gps extends EventEmitter {
  constructor(port) {
    super()
    this.port = port
    this._on = false
    this.Start()
  }

  Start() {
    try {
      if (!this._on) {
        gps.Start(this.port)
        this._on = true
        this.StartLoop()
      }
    } catch (e) {
      gps.Stop()
      console.error(e)
    }
  }

  StartLoop() {
    this.loop = setTimeout(() => this.emit("data", gps.GetData()) , 0)
  }

  StopLoop() {
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
module.exports = (port) => new Gps(port)

/**
 * @typedef {{ latitude: number, longitude: number, altitude:number, speed: number, course: number }} PositionData
 * @typedef {(err: Error,data: PositionData) => void} GpsCallback
 */