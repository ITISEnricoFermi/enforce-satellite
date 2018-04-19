const {
    EventEmitter
} = require('events')
const BNO055 = require('./BNO055')

class IMU extends EventEmitter {
    constructor(i2cDev, delay) {
        super()
        this.delay = (delay && !isNaN(delay)) ? delay : 0
        this._on = false
        this.running = false
        this.imu = new BNO055({
            device: i2cDev || '/dev/i2c-0'
        })
        this.imu.beginNDOF((err, ok) => {
            if (err) return console.error("IMU error: ", err)
            this._on = true
            this.startReading()
            console.log('imu enabled')
        })
    }

    checkQuaternion() {
        this.quaternionChecker = setTimeout(() =>
            this.imu.getQuaternion((error, data) => {
                this.emit('quaternion', data)
                this.checkQuaternion()
            }), this.delay)
    }

    checkEuler() {
        this.eulerChecker = setTimeout(() =>
            this.imu.getEuler((error, data) => {
                this.emit('euler', data)
                this.checkEuler()
            }), this.delay)
    }

    startReading() {
        if (this._on && !this.running) {
            this.checkQuaternion()
            this.checkEuler()
            this.running = true
        }
    }

    stopReading() {
        if (this._on && this.running) {
            clearTimeout(this.quaternionChecker)
            clearTimeout(this.eulerChecker)
            this.running = false
        }
    }
}

module.exports = IMU