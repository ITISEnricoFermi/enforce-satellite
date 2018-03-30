const readline = require('readline');
const { XBee } = require('./deps/XBee');
const xbee = new XBee(process.env.SATSERIAL || 'COM4');

const l = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

l.on('line', d => {
  xbee.sendData(d);
})
let i = 0;

setInterval(() => {
  xbee.sendData(i++)
}, 1000)

xbee.on('data', d => {
  console.log(d);
})