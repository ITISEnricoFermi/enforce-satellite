const { EventEmitter } = require('events')

class Sensors extends EventEmitter {
    constructor() {
        super()

        setInterval(() => {
            this.emit('position', {x: Math.random() * 1000, y: Math.random() * 1000})
            this.emit('orientation', Math.random() * 360)
        })
		}

		stopAll() {}
}

module.exports = Sensors
