// const sensors = require('sensors')
// const db = require('database')
const comms = new (require('./mock/comms.mock'))()
const motors = new (require('./deps/motors'))()

let config = {
	record: false,
	transmit: true
}

comms.on('data', (commandString) => {
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

// sensors.on('data', (data) => {
//     if (config.record) db.save(data)
//     if (config.transmit) comms.send(data)
// })