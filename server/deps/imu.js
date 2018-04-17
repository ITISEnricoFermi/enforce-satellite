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
        this.quaternionChecker = true
    }

    checkQuaternion() {
        this.imu.getQuaternion((error, data) => {
            this.emit('quaternion', data)
            if(this.quaternionChecker) this.checkQuaternion()
        })
    }

    startReading() {
        this.checkQuaternion()
    }

    stopReading() {
        this.quaternionChecker = false
    }
}

module.exports = () => new IMU()