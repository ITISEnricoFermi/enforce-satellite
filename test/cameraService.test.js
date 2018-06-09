let {ServiceBroker} = require("moleculer");

let transporter = process.env.TRANSPORTER || "TCP";

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
});

broker.createService({
	name: "event-handler",
	events: {

	},
	started() {
	}
});

let reqCount = 0;
let pendingReqs = [];

broker.start()
	.then(() => broker.repl())
	.then(() => broker.waitForServices("camera"))
	.then(() => {
		setInterval(() => {
			broker.call("camera.start")
		}, 1000);
	});
