// const sensors = require('./deps/sensors')()
// const db = require('database')
const { DataBase } = require("./lib/database")
const db = new DataBase("./database/enforce.db")
const xbee = new (require("module-xbee").XBee)(process.env.XBEEPORT || "/dev/ttyS2", 115200)
const comms = require('./lib/comms')(xbee)
const imu = require("./deps/imu")()
const gps = require("./deps/gps")("/dev/ttyS1")
// const motors = require('./mock/motors.mock')
// const targeter = require('./lib/targeter')
// const pilot = require('./lib/pilot')(motors)
const sensors = require('./lib/sensors')({gps, imu})

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
    db.insertPos({latitude: d.latitude, longitude: d.longitude, altitude: d.altitude})
})

sensors.on("quaternion", d => {
    comms.send("ori", d)
    db.insertOri({x: d.x, y: d.y, z: d.z, w:d.w, scale: 1})
})


