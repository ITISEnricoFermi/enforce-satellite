const debug = require("debug")("main")

const XBee = require("./mock/XBee").XBee
const IMU = require("./mock/imu")
const THP = require("./mock/thp")
const GPS = require("./mock/gps")
const MOTORS = require("./mock/motors")
const CAMERA = require("./mock/camera")
const STORAGE = require("./mock/storage")

const COMMS = require('./lib/comms')
const SENSORS = require('./lib/sensors')
const ARCHIVER = require("./lib/archiver")
const TARGETER = require("./lib/targeter")
const PILOT = require("./lib/pilot")

const motors = new MOTORS()
const target = new TARGETER({
    x: 10.932707,
    y: 44.649381
})

target.setPosition({
    x: 10.929782,
    y: 44.649649
})

const xbee = new XBee(process.env.XBEEPORT || "/dev/ttyS2", 115200)
const storage = new STORAGE()
const gps = new GPS("/dev/ttyS1")
const thp = new THP()
const imu = new IMU(null)
const camera = new CAMERA().start()

const comms = new COMMS(xbee)
const pilot = new PILOT(motors)
const archiver = new ARCHIVER(storage)
const sensors = new SENSORS({
    thp,
    imu,
    gps
})

archiver.beginMission()

comms.on("command", (commandString) => {
    debug('Received command: ' + commandString)
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
            target.setTarget({
                x: parseFloat(locarr[1]),
                y: parseFloat(locarr[0].slice(1))
            })
            break;
        case 'c':
            if (commandString[1] === 's') {
                if (commandString[2] === '0') camera.kill()
                if (commandString[2] === '1') camera.start()
            } else {
                if (commandString[1] === '0') camera.kill()
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
            comms.send("status", Object.assign({}, sensors.status(), motors.getStatus(), pilot.status()))
            break;
        case 'p':
            if (commandString[1] === '0') pilot.disableAutopilot()
            if (commandString[1] === '1') pilot.enableAutopilot()
            comms.send("status", Object.assign({}, sensors.status(), motors.getStatus(), pilot.status()))
            break;
        default:
            comms.send(`Command ${commandString} not defined.`)
            break;
    }
})

sensors.on("quaternion", d => {
    comms.send("orientation", d)
    archiver.saveData({orientation: d})
})

sensors.on("euler", d => {
    target.setOrientation(d.heading)
})

sensors.on("temperature", d => {
    comms.send("temperature", d)
    archiver.saveData({temperature: d})
})

sensors.on("humidity", d => {
    comms.send("humidity", d)
    archiver.saveData({humidity: d})
})

sensors.on("pressure", d => {
    comms.send("pressure", d)
    archiver.saveData({pressure: d})
})

sensors.on("position", d => {
    archiver.saveData({position: d})
//    target.setPosition({
//        x: d.longitude,
//        y: d.latitude
//    })
    delete d.course
    comms.send("position", d)
    comms.send("target", Object.assign({}, {target: target.target}, {directionD: target.getTargetDirectionDelta(), distance: target.getTargetDistance()}))
})

pilot.enableAutopilot(target)

process.on('SIGINT', () => {
		camera.kill()
		sensors.stopAll()
		if (process.env.DEBUG) process.exit(0)
})
