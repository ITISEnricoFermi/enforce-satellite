class Comms {
    constructor() {
        this.state = false
        this.events = []
        this.repeat = setInterval(() => {
            this.trigger('data')
        }, 1000)
    }

    on(event, callback) {
        if (this.events[event] === undefined) this.events[event] = []
        this.events[event].push(callback)
    }

    trigger(event) {
        if (this.events['data'] !== undefined) this.events['data'].forEach(callback => {
            const tempStr = this.state ? 'ml1' : 'ml0'
            this.state = !this.state
            callback(tempStr)
        })
    }
}

module.exports = Comms