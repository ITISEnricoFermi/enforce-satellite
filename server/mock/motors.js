const debug = require("debug")("mock:motors")

class MotorsController {
    constructor() {
        this.debugEnabled = false
    }

    setDebug(state) {
        this.debugEnabled = state
    }

    setRight(state) {
        if (this.debugEnabled) debug('Right motor set to: ' + state)
    }

    setLeft(state) {
        if (this.debugEnabled) debug('Left motor set to: ' + state)
    }
}

module.exports = MotorsController
