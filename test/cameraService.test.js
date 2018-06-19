let {ServiceBroker} = require("moleculer")

let transporter = process.env.TRANSPORTER || "TCP"

// Create broker
let broker = new ServiceBroker({
	namespace: "multi",
	nodeID: process.argv[2] || "client-" + process.pid,
	transporter,
	serializer: "ProtoBuf",
	requestTimeout: 1000,

	circuitBreaker: {
		enabled: false,
		maxFailures: 3
	},
	logger: console,
	logLevel: process.env.LOGLEVEL,
	logFormatter: "simple"
})

broker.createService({
	name: "event-handler",
	events: {
		"thp.data"(data) {
			this.logger.info(data)
		},
		"imu.quaternion"(data) {
			this.logger.info(data)
		},
		"imu.euler"(data) {
			this.logger.info(data)
		},
		"gps.data"(data) {
			this.logger.info(data)
		}
	}
})


broker.start()
	.then(() => broker.repl())
