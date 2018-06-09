const Gpio = require('onoff').Gpio

class MotorsController {
    constructor() {
        this.left = new Gpio(64, 'out')
        this.right = new Gpio(65, 'out')

        this.setLeft(false)
        this.setRight(false)

        process.on('SIGINT', () => {
            this.right.unexport();
            this.left.unexport();
        })
    }

    getStatusLeft() {
        return this.left.readSync() === 0 ? false : true
    }

    getStatusRight() {
        return this.right.readSync() === 0 ? false : true
    }

    getStatus() {
        return {
            leftMotor: this.getStatusLeft(),
            rightMotor: this.getStatusRight()
        }
    }

    setRight(state) {
        this.right.writeSync(state ? 1 : 0)
    }

    setLeft(state) {
        this.left.writeSync(state ? 1 : 0)
    }
}

module.exports = MotorsController