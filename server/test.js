const imu = require('deps/imu')()
const sensors = require('lib/sensors')({imu: imu})

sensors.on('quaternion', console.log)

//setTimeout(() => imu.stopReading(), 5000)
