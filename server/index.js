const readline = require('readline');
// const { XBee } = require('./deps/XBee');
// const xbee = new XBee('COM1');
const { socketXBee } = require('./deps/socketXbee');
const xbee = new socketXBee('http://192.168.43.216:3000/');

const l = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

l.on('line', d => {
  xbee.sendData(d);
})

xbee.on('data', d => {
  console.log(d);
})