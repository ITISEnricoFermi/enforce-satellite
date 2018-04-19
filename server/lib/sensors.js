const {
    EventEmitter
} = require('events')

const IMU = require("../deps/imu")

const SENSORS = {
    gps: false,
    imu: false,
    thp: false
}

class Sensors extends EventEmitter {
    constructor(sensors) {
        super()

        SENSORS.gps = sensors.hasOwnProperty("gps")
        SENSORS.imu = sensors.hasOwnProperty("imu")
        SENSORS.thp = sensors.hasOwnProperty("thp")        

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

        if (SENSORS.thp) {
            this.thp = sensors.thp
            this.thp.startReading()
            this.thp.on("data", d => {
                this.emit("temp", d.temperature_C)
            })
            this.thp.on("data", d => {
                this.emit("humidity", d.humidity)
            })
            this.thp.on("data", d => {
                this.emit("pressure", d.pressure_hPa)
            })
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

    thpOn() {
        if (SENSORS.thp)
            this.thp.startReading()
    }

    thpOff() {
        if (SENSORS.thp)
            this.thp.stopReading()
    }
}

/**
 * @param {{gps, imu}} sensors 
 */
module.exports = Sensors