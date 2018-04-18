//const imu = require('./deps/imu')()
//const sensors = require('./lib/sensors')({imu})
//const motors = require('./deps/motors')()
//const pilot = require('./lib/pilot')(motors)
//const targeter = require('./lib/targeter')()
const xbee = require("./mock/XBee")()
const comms = require("./lib/comms")(xbee)

comms.send("loc", {test: 0342})

comms.on("")

// sensors.on('quaternion', (data) => {
//     targeter.setCurrentOrientation(data.z)
// })

// pilot.enableAutopilot(targeter)


//setTimeout(() => imu.stopReading(), 5000)
