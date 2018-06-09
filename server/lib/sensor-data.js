const { EventEmitter } = require("events")

class SensorData extends EventEmitter {
    constructor() {
        super()
        this.precision = []
        this.values = []
        this.cooldown = 0
        this.lastUpdate = 0
    }
    
    getValues() {
        return this.values
    }

    setCooldown(newCooldown) {
        this.cooldown = newCooldown
    }

    updateValues(newValues) {
        const now = Date.now()
        if (Math.abs(this.lastUpdate - now) >= this.cooldown) {
            let changed = false

            for(i = 0; i < this.values.length; i++) {
                if(Math.abs(this.values[i] - newValues[i]) > this.precision) {
                    this.values[i] = newValues[i]
                    changed = true
                }
            }

            if (changed) {
                this.lastUpdate = now
                this.emit('changed', this.values)
                return true
            }
        }
        return false
    }
}