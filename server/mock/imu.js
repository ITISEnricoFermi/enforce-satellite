const { EventEmitter } = require('events')

class IMU extends EventEmitter {
    constructor() {
        super()
        this.enabled = false
        setTimeout(() => {
            this.enabled = true
            console.log('imu enabled')
        }, 100)
    }

    checkQuaternion() {
        this.quaternionChecker = setTimeout(() =>
            setTimeout((error, data) => {
                this.emit('quaternion', {
                    x: Math.random(),
                    y: Math.random(),
                    z: Math.random(),
                    w: Math.random()
                })
                this.checkQuaternion()
            }, 100), 0)
    }

    checkEuler() {
        this.eulerChecker = setTimeout(() =>
            setTimeout((error, data) => {
                this.emit('euler', {
                    pitch: Math.random() * 360 - 180,
                    roll: Math.random() * 180 - 90,
                    heading: Math.random() * 360
                })
                this.checkEuler()
            }, 100), 0)
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

module.exports = new IMU()