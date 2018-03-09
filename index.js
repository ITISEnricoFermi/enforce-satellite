const readline = require('readline');
const { XBee } = require('./deps/XBee');

const xbee = new XBee('COM1');

const l = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

l.on('line', d => {
  xbee.sendData(d);
})

xbee.on('data', d => {
  l.write(d+"\n");
})