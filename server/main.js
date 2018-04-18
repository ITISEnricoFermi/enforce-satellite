// const sensors = require('./deps/sensors')()
// const db = require('database')
const xbee = new (require("module-xbee").XBee)(process.env.XBEEPORT || "/dev/ttyS2", 115200)
const comms = require('./lib/comms')(xbee)
const imu = require("./deps/imu")()
const thp = require("./deps/thp")
const gps = require("./deps/gps")("/dev/ttyS1")
// const motors = require('./mock/motors.mock')
// const targeter = require('./lib/targeter')
// const pilot = require('./lib/pilot')(motors)
const sensors = require('./lib/sensors')({gps, imu, thp})

let config = {
    record: false,
    transmit: true,
    autopilot: true
}

comms.on("command", (commandString) => {
    console.log('Received command: ' + commandString)
    switch (commandString[0]) {
        case 'm':
            let motorState

			if (commandString[2] === '0') motorState = true
			if (commandString[2] === '1') motorState = false

			if (commandString[1] === 'r') motors.setRight(motorState)
			if (commandString[1] === 'l') motors.setLeft(motorState)

		break;
    }
})

sensors.on("gps", d => {
    comms.send("loc", d)
})

sensors.on("temp", t => {
    comms.send("tmp", t)
})

sensors.on("quaternion", d => {
    comms.send("ori", d)
})


