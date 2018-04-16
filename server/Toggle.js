const gps = require("./mock/gps")
const bmetpu = require("./mock/bmetpu")
const bnomag = require("./mock/bnomag")

let sensori = {
  gps: [false, gps],
  bmetpu: [false, bmetpu],
  bnomag: [false, bnomag]  
}

module.exports.ToggleGps = () => {
  if (sensori.gps[0]) {
    sensori.gps[1].Start(process.env.GPSPORT, (err) => {
      if (err) throw err
      sensori.gps[0] = true
    })
  } else {
    sensori.gps[1].Stop()
    sensori.gps[0] = false
  }
}

module.exports.ToggleBmeTPU = () => {

}

module.exports.ToggleBnoMAG = () => {

}

module.exports = {
  gps,
  bnomag,
  bmetpu
}