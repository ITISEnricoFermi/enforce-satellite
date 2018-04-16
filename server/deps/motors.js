const Gpio = require('onoff').Gpio

class MotorsController {
    constructor() {
        this.left = new Gpio(1, 'out')
        this.right = new Gpio(2, 'out')
    }

    setRight(state) {
        this.right.write(state ? 1 : 0)
    }

    setLeft(state) {
        this.left.write(state ? 1 : 0)
    }
}

module.exports = MotorsController