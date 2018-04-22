const EventEmitter = require('events')

class Targeter extends EventEmitter {
    constructor(target) {
        super()

        this.target = target

        this.currentPosition = {
            x: 0,
            y: 0
        }
        
        this.currentOrientation = 0
        this.deadzone = 0.1 * Math.PI
    }

    setPosition(position) {
        this.currentPosition = position
    }

    setOrientation(angle) {
        this.currentOrientation = angle
    }

    setTarget(target) {
        this.target = target
    }

    getTargetDirection() {
        const temp = {
            x: this.target.x - this.currentPosition.x,
            y: this.target.y - this.currentPosition.y
        }
        return this.getAngleToVector(temp)
    }

    getAngleToVector(vec) {
        return Math.atan2(vec.y, vec.x)
    }

    getTargetDirectionDelta() {
        const delta = ((d1, d2) => {return Math.abs(d1) < Math.abs(d2) ? d1 : -d2})
        (this.getTargetDirection() - this.currentOrientation,
        -this.getTargetDirection() + this.currentOrientation - 360)

        this.emit('target', {
            angle: delta,
            distance: this.getTargetDistance()
        })

        return delta
    }

    // getTargetDistance() {
    //     return Math.sqrt(
    //         Math.pow(Math.abs(this.target.x - this.currentPosition.x), 2) +
    //         Math.pow(Math.abs(this.target.y - this.currentPosition.y), 2))
    // }

    getTurnDirection() {
        const delta = this.getTargetDirectionDelta()
        if (Math.abs(delta) < this.deadzone) return 0
        return delta > 0 ? 1 : -1
    }

    getTargetDistance(){  // generally used geo measurement function
        const lat1 = this.currentPosition.x
        const lon1 = this.currentPosition.y
        const lat2 = this.target.x
        const lon2 = this.target.y

        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
    }
}

module.exports = Targeter