const XBee = require("./deps/XBee").XBee
const COMMS = require('./lib/comms')
const IMU = require("./deps/imu")
const THP = require("./deps/thp")
const GPS = require("./deps/gps")
const SENSORS = require('./lib/sensors')
const STORAGE = require("./storage/StorageClass")
const ARCHIVER = require("./lib/archiver")
const TARGETER = require("./lib/targeter")
const MOTORS = require("./deps/motors")
const PILOT = require("./lib/pilot")
const CAMERA = require("./deps/Camera")

const motors = new MOTORS()
const target = new TARGETER({
    x: 0,
    y: 0
})

const camera = new CAMERA().start()
const pilot = new PILOT(motors)
const storage = new STORAGE()
const archiver = new ARCHIVER(storage)
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

archiver.beginMission()

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
        case 'x':
            let locarr = commandString.split(",")
            let lat = parseFloat(locarr[0].slice(1))
            let lon = parseFloat(locarr[1])
            target.setTarget({
                x: lon,
                y: lat
            })
            break;
        case 'c':
            if (commandString[1] === 's') {
                if (commandString[2] === '0') camera.kill()
                if (commandString[2] === '1') camera.start()
            } else {
                if (commandString[1] === '0') camera.stop()
                if (commandString[1] === '1') camera.start()
            }
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
        case 's':
            comms.send("status", Object.assign({}, sensors.status(), motors.getStatus()))
            break;
        case 'p':
            if (commandString[1] === '0') pilot.disableAutopilot()
            if (commandString[1] === '1') pilot.enableAutopilot()
            break;
        default:
            comms.send(null, `Command ${commandString} not defined.`)
            break;
    }
})

sensors.on("quaternion", d => {
    comms.send("ori", d)
    archiver.saveData("orientation", d)
})

sensors.on("euler", d => {
    target.setOrientation(d.heading)
})

sensors.on("temp", d => {
    comms.send("tmp", d)
    archiver.saveData("temperature", d)
})

sensors.on("humidity", d => {
    comms.send("umd", d)
    archiver.saveData("humidity", d)
})

sensors.on("pressure", d => {
    comms.send("pre", d)
    archiver.saveData("pressure", d)
})

sensors.on("location", d => {
    archiver.saveData("location", d)
    target.setPosition({
        x: d.longitude,
        y: d.latitude
    })
    delete d.course
    comms.send("loc", d)
    comms.send("target", target)
})

pilot.enableAutopilot(target)

process.on('SIGINT', () => {
    camera.kill()
})
