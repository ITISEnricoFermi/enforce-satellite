const config = require("../config.json")

// TODO: abstract init function calls
const comms = require("./init/initComunications").init(config.communication)
const sensors = require("./init/initSensors").init(config.sensors)
const storage = require("./init/initArchive").init(config.storage)
const camera = require("./init/initCamera").init(config.camera)
const motors = require("./init/initMotors").init(config.motors)


const TARGETER = require("./lib/targeter")
const PILOT = require("./lib/pilot")
const ENFORCE_CLI = require("enforce-cli")

const targeter = new TARGETER({
	x: 10.932707,
	y: 44.649381
})

targeter.setPosition({
	x: 10.929782,
	y: 44.649649
})


const pilot = new PILOT(motors)

new ENFORCE_CLI(comms, {
	sensors,
	motors,
	camera
})


camera.start()
archiver.beginMission()

// comms.on("command", (commandString) => {
// 	console.log('Received command: ' + commandString)
// 	switch (commandString[0]) {
// 		case 'x':
// 			let locarr = commandString.split(",")
// 			targeter.setTarget({
// 				x: parseFloat(locarr[1]),
// 				y: parseFloat(locarr[0].slice(1))
// 			})
// 			break;
// 		case 'p':
// 			if (commandString[1] === '0') pilot.disableAutopilot()
// 			if (commandString[1] === '1') pilot.enableAutopilot()
// 			comms.send("status", Object.assign({}, sensors.status(), motors.getStatus(), pilot.status()))
// 			break;
// 		default:
// 			comms.send(`Command ${commandString} not defined.`)
// 			break;
// 	}
// })

sensors.on("quaternion", d => {
	comms.send("orientation", d)
	archiver.saveData({
		orientation: d
	})
})

sensors.on("euler", d => {
	if (d) targeter.setOrientation(d.heading)
})

sensors.on("temperature", d => {
	comms.send("temperature", d)
	archiver.saveData({
		temperature: d
	})
})

sensors.on("humidity", d => {
	comms.send("humidity", d)
	archiver.saveData({
		humidity: d
	})
})

sensors.on("pressure", d => {
	comms.send("pressure", d)
	archiver.saveData({
		pressure: d
	})
})

sensors.on("position", d => {
	archiver.saveData({
		position: d
	})
	//    targeter.setPosition({
	//        x: d.longitude,
	//        y: d.latitude
	//    })
	comms.send("position", d)
	comms.send("target", Object.assign({}, {
		target: targeter.target
	}, {
		directionD: targeter.getTargetDirectionDelta(),
		distance: targeter.getTargetDistance()
	}))
})

pilot.enableAutopilot(targeter)

process.on('SIGINT', () => {
	sensors.stopAll()
	if (process.env.DEBUG) process.exit(0)
})
