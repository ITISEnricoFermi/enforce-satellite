const XBee = require("module-xbee").XBee
const COMMS = require('./lib/comms')
const IMU = require("./deps/imu")
const THP = require("./deps/thp")
const GPS = require("./deps/gps")
const SENSORS = require('./lib/sensors')
// const Database = require("./database/database")

// const db = new Database("./enforce.db")
const xbee = new XBee(process.env.XBEEPORT || "/dev/ttyS2", 115200)
const gps = new GPS("/dev/ttyS1")
const comms = new COMMS(xbee)
const thp = new THP()
const imu = new IMU(null)
const sensors = new SENSORS({
    thp,
    imu,
    gps
})

// const motors = require('./mock/motors.mock')
// const targeter = require('./lib/targeter')
// const pilot = require('./lib/pilot')(motors)

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

        case 'g':
            if (sensors.SENSORS.gps) {
                if (commandString[1] === '0') sensors.gpsOff()
                if (commandString[1] === '1') sensors.gpsOn()
            }
            break;
        case 'c':
            break;
        case 'i':
            if (sensors.SENSORS.imu) {
                if (commandString[1] === '0') sensors.imuOff()
                if (commandString[1] === '1') sensors.imiOn()
            }
            break;
        case 'b':
            if (sensors.SENSORS.thp) {
                if (commandString[1] === '0') sensors.thpOff()
                if (commandString[1] === '1') sensors.thpOn()
            }
            break;
    }
})

sensors.on("quaternion", d => {
    comms.send("ori", d)
    // db.insertOri({ x: d.x, y: d.y, z: d.z, w: d.w, scale: 1 })
})

sensors.on("temp", d => {
    comms.send("tmp", d)
    // db.insertTemp(d)
})

sensors.on("humidity", d => {
    comms.send("umd", d)
    // db.insertUmid(d)
})

sensors.on("pressure", d => {
    comms.send("pre", d)
})

sensors.on("location", d => {
    delete d.course
    comms.send("loc", d)
    // db.insertPos({latitude: d.latitude, longitude: d.longitude, altitude: d.altitude})
})

// sensors.on("quaternion", d => {
//     comms.send("ori", d)
// })