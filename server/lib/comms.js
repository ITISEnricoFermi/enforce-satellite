const {
  EventEmitter
} = require("events")
const {
  XBee
} = require("module-xbee");


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
    switch (dataType) {
      case "loc":
        this.xbee.sentLOC(data)
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
      default:
        this.xbee.sendData(data)
        break;
    }
  }

}

module.exports = Comms

/**
 * @typedef {"loc" | "umd" | "tmp" | "pre" | "ori"} DataType
 * @typedef {any} DATA
 */