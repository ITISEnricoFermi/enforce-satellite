const imu = require('./deps/imu')()

imu.startReading()

imu.on('quaternion', console.log)

//setTimeout(() => imu.stopReading(), 5000)
