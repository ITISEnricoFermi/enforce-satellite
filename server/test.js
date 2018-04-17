var BNO055 = require('bno055');
 
var imu = new BNO055({device: '/dev/i2c-0'});
console.log(imu.options)
 
imu.beginNDOF(function() {
    console.info('imu running');
    console.log(imu.getCalibrationStatus)
});
