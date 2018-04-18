const { EventEmitter } = require('events')
const BNO055 = require('bno055')

class IMU extends EventEmitter {
    constructor(i2cDev) {
        super()
        this.enabled = false
        this.imu = new BNO055({device: i2cDev || '/dev/i2c-0'})
        this.imu.beginNDOF(() => {
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
        this.checkQuaternion()
        this.checkEuler()
    }

    stopReading() {
        clearTimeout(this.quaternionChecker)
        clearTimeout(this.eulerChecker)
    }
}

module.exports = (i2cDev) => new IMU(i2cDev)