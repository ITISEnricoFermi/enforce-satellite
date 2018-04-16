const Gpio = require('onoff').Gpio

class MotorsController {
    constructor() {
        const left = new Gpio(1, 'out')
        const right = new Gpio(2, 'out')
    }

    setRight(state) {
        right.write(state ? 1 : 0)
    }

    setLeft(state) {
        left.write(state ? 1 : 0)
    }
}

module.exports = MotorsController