var BNO055 = require('bno055');
 
var async = require('async');
 
<<<<<<< HEAD
var imu = new BNO055();

console.log(imu.options)
=======
var imu = new BNO055({device: '/dev/i2c-0'});
>>>>>>> 91cb5d821cebceff72ebbd1a409b6df56bdb26e0
 
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
