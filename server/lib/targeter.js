class Targeter {
    constructor(target) {
        this.target = target

        this.currentPosition = {
            x: 0,
            y: 0
        }

        this.currentOrientation = 0
        this.deadzone = 10
    }

    setCurrentPosition(position) {
        this.currentPosition = position
    }

    setCurrentOrientation(angle) {
        this.currentOrientation = angle
    }

    getTargetDirection() {
        const temp = {
            x: this.target.x - this.currentPosition.x,
            y: this.target.y - this.currentPosition.y
        }
        return this.getAngleFromVector(temp)
    }

    getAngleFromVector(vec) {
        return Math.atan2(vec.x, vec.y) / Math.PI * 180
    }

    getTargetDirectionDelta() {
        const delta = ((d1, d2) => {return Math.abs(d1) < Math.abs(d2) ? d1 : -d2})
            (this.getTargetDirection() - this.currentOrientation,
            -this.getTargetDirection() + this.currentOrientation - 360)
        
        if (Math.abs(delta) < 10) return 0
        else return delta
    }

    getTurnDirection() {
        const delta = this.getTargetDirectionDelta()
        if (Math.abs(delta) < this.deadzone) return 0
        return delta > 0 ? 1 : -1
    }
}

module.exports = (target) => new Targeter(target)