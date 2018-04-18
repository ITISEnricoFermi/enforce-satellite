const {
    EventEmitter
} = require('events')

const IMU = require("../deps/imu")

const SENSORS = {
    gps: false,
    imu: false
}

class Sensors extends EventEmitter {
    constructor(sensors) {
        super()

        SENSORS.gps = sensors.hasOwnProperty("gps")
        SENSORS.imu = sensors.hasOwnProperty("imu")

        if (SENSORS.imu) {
            this.imu = sensors.imu
            this.imu.startReading()
            this.imu.on('quaternion', (data) => {
                this.emit('quaternion', data)
            })
            this.imu.on('euler', (data) => {
                this.emit('euler', data)
            })
        }
        if (SENSORS.gps) {
            this.gps = sensors.gps
            this.gps.StartLoop()
            this.gps.on("data", d => this.emit("gps", d))
        }
    }

    gpsOn() {
        if (SENSORS.gps)
            this.gps.StopLoop()
    }

    gpsOff() {
        if (SENSORS.gps)
            this.gps.StopLoop()
    }

    imiOn() {
        if (SENSORS.imu)
            this.imu.startReading()
    }

    imuOff() {
        if (SENSORS.imu)
            this.imu.stopReading()
    }
}

/**
 * @param {{gps, imu}} sensors 
 */
module.exports = (sensors) => new Sensors(sensors)