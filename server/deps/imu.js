const { EventEmitter } = require('events')
const BNO055 = require('bno055')

class IMU extends EventEmitter {
    constructor() {
        super()
        this.enabled = false
        this.imu = new BNO055({device: '/dev/i2c-0'})
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

    startReading() {
        this.checkQuaternion()
    }

    stopReading() {
        clearInterval(this.quaternionChecker)
    }
}

module.exports = () => new IMU()