const readline = require('readline');
const { XBee } = require('./deps/XBee');
const xbee = new XBee(process.env.SATSERIAL || 'COM4', 115200);
/*{ sendData: function(data) { console.log(data) }, on: function(e, cb) { cb(e) } };*/

const l = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

l.on('line', d => {
  xbee.sendData(d);
})

xbee.on('data', d => {
  console.log(d);
  xbee.sendData(d);
})