const {
  EventEmitter
} = require("events")
const {
  XBee
} = require("../deps/XBee");


/**
 * @description Wrapper for XBee module
 */
class Comms extends EventEmitter {

  /**
   * @param {XBee} xbee
   */
  constructor(xbee) {
    super()
    if (!xbee) throw new Error(`"xbee is not defined."`)
    this.xbee = xbee;
    this.xbee.onData(d => this.emit("data", d))
    this.xbee.onCommand(c => this.emit("command", c))

    this.timestamps = []
    this.cooldown = 100
  }

  /**
   * @param {"data" | "command"} event 
   * @param {(...args) => {}} listener 
   */
  onE(event, listener) {
    this.on(event, listener)
  }

  /**
   * @param {DataType} dataType 
   * @param {DATA} data 
   */
  send(dataType, data) {
    if (!this.timestamps[dataType]) this.timestamps[dataType] = Date.now()
    else if (Date.now() - this.timestamps[dataType] < this.cooldown) return
    else this.timestamps[dataType] = Date.now()

    switch (dataType) {
      case "loc":
        this.xbee.sendLOC(data)
        break;
      case "ori":
        this.xbee.sendORI(data)
        break;
      case "umd":
        this.xbee.sendUMD(data)
        break;
      case "pre":
        this.xbee.sendPRE(data)
        break;
      case "tmp":
        this.xbee.sendTMP(data)
        break;
      case "target":
        this.xbee.sendTarget(data)
        break;
      case "status":
        this.xbee.sendStatus(data)
        break;
      default:
        this.xbee.sendData(data)
        break;
    }
  }

}

module.exports = Comms

/**
 * @typedef {"loc" | "umd" | "tmp" | "pre" | "ori" | "target"} DataType
 * @typedef {any} DATA
 */