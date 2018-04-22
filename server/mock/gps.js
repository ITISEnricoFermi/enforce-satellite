class GPS {
  constructor() {
    this.status = false
  }
  GetData(callback) {
    if (!this.status) throw new Error("First start the communication!")
    if (callback && callback instanceof Function) {
      callback({ latitude: 0, longitude: 0, speed: 10.0, altitude: 50, course: 152.093 })
    } else {
      return { latitude: 0, longitude: 0, speed: 10.0, altitude: 50, course: 152.093 }
    }
  }
  Start(port, callback) {
    if (callback && callback instanceof Function) callback(null)
    this.status = true
  }
  Stop() {
    this.status = false
  }
}

module.exports = GPS