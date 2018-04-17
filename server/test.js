imu = require('./deps/imu')()

imu.startReading()

imu.on('quaternion', console.log)