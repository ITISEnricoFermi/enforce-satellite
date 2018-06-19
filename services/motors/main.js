"use strict"

let { ServiceBroker } = require("moleculer")

let transporter = process.env.TRANSPORTER || "TCP"

// Create broker
let broker = new ServiceBroker({
	namespace: "multi",
	nodeID: process.argv[2] || "motors-" + process.pid,
	transporter,
	serializer: "ProtoBuf",

	logger: console,
	logLevel: process.env.LOGLEVEL,
	logFormatter: "simple"
})

broker.createService(require("./motors.service"))

broker.start()
	.then(() => broker.repl())
