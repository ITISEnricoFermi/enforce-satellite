class MotorsController {
    constructor() {
        this.debugEnabled = false
    }

    setRight(state) {
        if (this.debugEnabled) console.log('Right motor set to: ' + state)
    }

    setLeft(state) {
        if (this.debugEnabled) console.log('Left motor set to: ' + state)
    }
}

module.exports = MotorsController