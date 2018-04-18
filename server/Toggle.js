const gps = require("./mock/gps")
const bmetpu = require("./mock/bmetpu")
const bnomag = require("./mock/bnomag")

let sensori = {
  gps: [false, gps],
  bmetpu: [false, bmetpu],
  bnomag: [false, bnomag]  
}

module.exports.ToggleGps = () => {

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