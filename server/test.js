var BNO055 = require('bno055');
 
var async = require('async');
 
var imu = new BNO055({device: '/dev/i2c-0'});
 
imu.beginNDOF(function() {
    console.info('imu running');
 
    setInterval(function() {
        async.series({
            calibrationStatus: imu.getCalibrationStatus.bind(imu),
            quaternion: imu.getQuaternion.bind(imu),
            euler: imu.getEuler.bind(imu),
            linearAcceleration: imu.getLinearAcceleration.bind(imu)
        },
        function(err, results) {
            console.info( 'imu: ', JSON.stringify(results) );
        });
    }, 1000);
});