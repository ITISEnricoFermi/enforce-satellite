const {
  EventEmitter
} = require("events");

class XBee extends EventEmitter {
  constructor() {
    super()
    let dt = setInterval(() => {
      this.emit('data', "some random data")
    }, 1000)
    let ci = setInterval(() => {
      this.emit("command", "asd0")
    }, 3200)
  }

  onData(callback) {
    this.on("data", callback)
  }

  onCommand(callback) {
    this.on("command", callback)
  }

  sendData(data) {
    process.stdout.write("Sending data");
    setTimeout(() => {
      process.stdout.write(".")
      setTimeout(() => {
        process.stdout.write(".")
        setTimeout(() => {
          process.stdout.write(". ")
          console.log("Woosh!")
        }, 500)
      }, 500)
    }, 500)
  }

  sendCommand(command) {
    process.stdout.write(`Sending command ${command}`);
    setTimeout(() => {
      process.stdout.write(".")
      setTimeout(() => {
        process.stdout.write(".")
        setTimeout(() => {
          process.stdout.write(". ")
          console.log("Woosh!")
        }, 500)
      }, 500)
    }, 500)
  }

  sentLOC(data) {
    this.sendData(data)
  }

  sendORI(data) {
    this.sendData(data)
  }

  sendUMD(data) {
    this.sendData(data)
  }

  sendPRE(data) {
    this.sendData(data)
  }

  sendTMP(data) {
    this.sendData(data)
  }
}

module.exports = {XBee}