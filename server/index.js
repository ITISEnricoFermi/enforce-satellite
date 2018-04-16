const readline = require("readline");
const { XBee } = require("./deps/XBee");
const sensors = require("./Toggle")
const fs = require("fs")
// const xbee = new XBee(process.env.SATSERIAL || "COM5", 115200);
const xbee = { sendData: function(data) { fs.appendFileSync("data.log", JSON.stringify(data)+"\n") }, on: function(e, cb) { cb(e) } };

const l = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

sensors.gps.Start()

function theData() {
  let data = sensors.gps.GetData()
  fs.writeFileSync("./gps-data.json", JSON.stringify(data, null, 2)+",")
  return data
}

l.on("line", d => {
  xbee.sendData(d);
})

setTimeout(() => { setInterval(() => { xbee.sendData(theData()) }, 1000)}, 1000)

xbee.on("data", d => {
  console.log(d);
})
