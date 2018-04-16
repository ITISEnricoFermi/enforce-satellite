const readline = require("readline");
const { XBee } = require("./deps/XBee");
const sensors = require("./Toggle")
const xbee = new XBee(process.env.SATSERIAL || "COM5", 115200);
/*{ sendData: function(data) { console.log(data) }, on: function(e, cb) { cb(e) } };*/

const l = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

l.on("line", d => {
  xbee.sendData(d);
})

setTimeout(() => { setInterval(() => { xbee.sendData(sensors.gps.GetData()) }, 1000)}, 1000)

xbee.on("data", d => {
  console.log(d);
})