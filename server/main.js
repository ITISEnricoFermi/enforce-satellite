// const sensors = require('./deps/sensors')()
// const db = require('database')
const comms = require('./mock/comms.mock')
const motors = require('./mock/motors.mock')
const targeter = require('./lib/targeter')
const pilot = require('./lib/pilot')(motors)
const sensors = require('./mock/sensors.mock')

let config = {
<<<<<<< HEAD
    record: false,
    transmit: true,
    autopilot: true
}

comms.on('data', (commandString) => {
    console.log('Received command: ' + commandString)
    switch (commandString[0]) {
        case 'm':
            let motorState
=======
	record: false,
	transmit: true
}

comms.on('data', (commandString) => {
	switch (commandString[0]) {
		case 'm':
			let motorState
>>>>>>> 0c3611e0c00e3e4dc4a572c2c5470772b5bcd466

			if (commandString[2] === '0') motorState = true
			if (commandString[2] === '1') motorState = false

			if (commandString[1] === 'r') motors.setRight(motorState)
			if (commandString[1] === 'l') motors.setLeft(motorState)

		break;
	}
})
