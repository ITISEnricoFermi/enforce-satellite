const { EventEmitter } = require('events')
const BNO055 = require('./BNO055')

class IMU extends EventEmitter {
    constructor(i2cDev) {
        super()
        this.enabled = false
        this.running = false
        this.imu = new BNO055({device: i2cDev || '/dev/i2c-0'})
        this.imu.beginNDOF((err, ok) => {
            if (err) return console.error("IMU error: ", err)
            this.enabled = true
            console.log('imu enabled')
        })
    }

    checkQuaternion() {
        this.quaternionChecker = setTimeout(() =>
            this.imu.getQuaternion((error, data) => {
                this.emit('quaternion', data)
                this.checkQuaternion()
            }), 0)
    }

    checkEuler() {
        this.eulerChecker = setTimeout(() =>
            this.imu.getEuler((error, data) => {
                this.emit('euler', data)
                this.checkEuler()
            }), 0)
    }

    startReading() {
        if (this.enabled && !this.running) {
            this.checkQuaternion()
            this.checkEuler()
            this.running = true
        }
    }

    stopReading() {
        if (this.enabled && this.running) {
            clearTimeout(this.quaternionChecker)
            clearTimeout(this.eulerChecker)
            this.running = false
        }
    }
}

module.exports = (i2cDev) => new IMU(i2cDev)