const fs = require("fs")
const shell = require("shelljs")

const checkDirSync = path => {
	if (!fs.existsSync(path))
		return shell.mkdir("-p", path);
};

class PlanB {
	constructor(filename, path) {
		this.path = (path) ? path : "./"
		checkDirSync(this.path)
		this.TEMPERATURE = `${filename}_temperatures`
		this.PRESSURE = `${filename}_pressures`
		this.HUMIDITY = `${filename}_humidity`
		this.ORIENTATION = `${filename}_orientations`
		this.LOCATION = `${filename}_locations`
		this.DUMP = `${filename}_DUMPS`

		this.HUMIDITY_PATH = `${this.path}${this.HUMIDITY}.csv`
		this.TEMPERATURE_PATH = `${this.path}${this.TEMPERATURE}.csv`
		this.PRESSURE_PATH = `${this.path}${this.PRESSURE}.csv`
		this.ORIENTATION_PATH = `${this.path}${this.ORIENTATION}.csv`
		this.LOCATION_PATH = `${this.path}${this.LOCATION}.csv`
		this.DUMP_PATH = `${this.path}${this.DUMP}.csv`

		if (!fs.existsSync(this.HUMIDITY_PATH))
			fs.writeFileSync(this.HUMIDITY_PATH, "")
		if (!fs.existsSync(this.TEMPERATURE_PATH))
			fs.writeFileSync(this.TEMPERATURE_PATH, "")
		if (!fs.existsSync(this.ORIENTATION_PATH))
			fs.writeFileSync(this.ORIENTATION_PATH, "")
		if (!fs.existsSync(this.LOCATION_PATH))
			fs.writeFileSync(this.LOCATION_PATH, "")
		if (!fs.existsSync(this.PRESSURE_PATH))
			fs.writeFileSync(this.PRESSURE_PATH, "")
		if (!fs.existsSync(this.DUMP_PATH))
			fs.writeFileSync(this.DUMP_PATH, "")
	}

	startMission(missionID) {
		this.mission = missionID
	}

	save(data) {
		if ("humidity" in data) {
			fs.appendFile(this.HUMIDITY_PATH, `${JSON.stringify(data)}|${new Date().getTime()}\n`, err => {
				if (err) console.log(err)
			})
		} else
		if ("position" in data) {
			fs.appendFile(this.LOCATION_PATH, `${JSON.stringify(data)}|${new Date().getTime()}\n`, err => {
				if (err) console.log(err)
			})
		} else
		if ("temperature" in data) {
			fs.appendFile(this.TEMPERATURE_PATH, `${JSON.stringify(data)}|${new Date().getTime()}\n`, err => {
				if (err) console.log(err)
			})
		} else
		if ("pressure" in data) {
			fs.appendFile(this.PRESSURE_PATH, `${JSON.stringify(data)}|${new Date().getTime()}\n`, err => {
				if (err) console.log(err)
			})
		} else
		if ("orientation" in data) {
			fs.appendFile(this.ORIENTATION_PATH, `${JSON.stringify(data)}|${new Date().getTime()}\n`, err => {
				if (err) console.log(err)
			})
		} else {
			fs.appendFile(this.DUMP_PATH, `${JSON.stringify(data)}|${new Date().getTime()}\n`, err => {
				if (err) console.log(err)
			})
		}
	}
}

module.exports = PlanB
