const XBee = require('./mock/XBee')
const Comms = require('./lib/comms')

const xbee = new XBee()
const comms = new Comms()

setInterval(comms.send('loc', {x: 'asd'}), 100)