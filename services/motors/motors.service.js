let { MoleculerError } = require("moleculer").Errors

const Motors = require("./mock/motors")
const motors = new Motors()

module.exports = {
	name: "motors",
	actions: {
		// TODO: check state motor left, right; start & stop motor left, right
	},
	created() {

	}
}
