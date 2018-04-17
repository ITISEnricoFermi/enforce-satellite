const { EventEmitter } = require('events')

class Sensors extends EventEmitter {
    constructor(sensors) {
        super()

        this.imu = sensors.imu

        this.imu.startReading()

        this.imu.on('quaternion', (data) => {
            this.emit('quaternion', data)
        })

        this.imu.on('euler', (data) => {
            this.emit('euler', data)
        })
    }
}

module.exports = (sensors) => new Sensors(sensors)