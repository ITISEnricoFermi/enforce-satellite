class Targeter {
    constructor() {
        this.targetPosition = {
            x: 40,
            y: 20
        }

        this.currentPosition = {
            x: 0,
            y: 0
        }

        this.targetOrientation = 90
        this.currentOrientation = 0
        this.deadzone = 10
    }

    setTargetPosition(position) {
        this.targetPosition = position
    }

    setCurrentPosition(position) {
        this.currentPosition = position
    }

    setCurrentOrientation(angle) {
        this.currentOrientation = angle
    }

    getTargetOrientationDelta() {
        const delta = ((d1, d2) => {return Math.abs(d1) < Math.abs(d2) ? d1 : -d2})
            (this.targetOrientation - this.currentOrientation,
            -this.targetOrientation + this.currentOrientation - 360)
        
        if (Math.abs(delta) < 10) return 0
        else return delta
    }

    getTurnDirection() {
        const delta = this.getTargetOrientationDelta()
        if (Math.abs(delta) < this.deadzone) return 0
        return delta > 0 ? 1 : -1
    }
}

module.exports = new Targeter()