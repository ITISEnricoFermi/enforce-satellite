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

  save(datatype, data, timestamp) {
    switch (datatype) {
      case "humidity":
        fs.writeFile(this.HUMIDITY_PATH, `${datatype}|${JSON.stringify(data)}|${timestamp}\n`, err => { if (err) console.log(err) })
        break;
      case "location":
        fs.writeFile(this.LOCATION_PATH, `${datatype}|${JSON.stringify(data)}|${timestamp}\n`, err => { if (err) console.log(err) })
        break;
      case "temperature":
        fs.writeFile(this.TEMPERATURE_PATH, `${datatype}|${JSON.stringify(data)}|${timestamp}\n`, err => { if (err) console.log(err) })
        break;
      case "pressure":
        fs.writeFile(this.PRESSURE_PATH, `${datatype}|${JSON.stringify(data)}|${timestamp}\n`, err => { if (err) console.log(err) })
        break;
      case "orientation":
        fs.writeFile(this.ORIENTATION_PATH, `${datatype}|${JSON.stringify(data)}|${timestamp}\n`, err => { if (err) console.log(err) })
        break;
      default:
        fs.writeFile(this.DUMP_PATH, `${datatype}|${JSON.stringify(data)}|${timestamp}\n`, err => { if (err) console.log(err) })
        break;
    }
  }
}

module.exports = PlanB