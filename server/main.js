// const sensors = require('./deps/sensors')()
const xbee = new (require("module-xbee").XBee)(process.env.XBEEPORT || "/dev/ttyS1", 115200)
const COMMS = require('./lib/comms')
const comms = new COMMS(xbee)
const IMU = require("./deps/imu")
const imu = new IMU(null, 0)
const THP = require("./deps/thp")
const thp = new THP(500)
const GPS = require("./deps/gps")
const gps = new GPS("/dev/ttyS2")
// const motors = require('./mock/motors.mock')
// const targeter = require('./lib/targeter')
// const pilot = require('./lib/pilot')(motors)
const SENSORS = require('./lib/sensors')
const sensors =new SENSORS({thp, imu, gps})

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

sensors.on("quaternion", d => {
    comms.send("ori", d)
})

sensors.on("temp", d => {
    comms.send("tmp", d)
})

sensors.on("humidity", d => {
    comms.send("umd", d)  
})

sensors.on("pressure", d => {
    comms.send("pre", d)  
})

sensors.on("location", d => {
    comms.send("loc", d)
})

// sensors.on("quaternion", d => {
//     comms.send("ori", d)
// })


