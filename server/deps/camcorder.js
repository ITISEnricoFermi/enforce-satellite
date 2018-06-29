const exec = require('child_process').exec

class Camcorder {
    constructor(path, fps, cam, codec) {
        this.path = path
        this.codec = codec
        this.cam = cam
        this.fps = fps
        this._command = 'ffmpeg -f dshow -i video="HP Webcam" -vf fps=15 ./img/out%d.png'
    }

    start(missionName) {
        console.log('starting recording')
        this.recordProcess = exec(
            'ffmpeg ' + '-f ' + this.codec + ' ' + '-i video="' + this.cam +'" ' + '-vf fps=' + this.fps + ' ' + this.path + missionName + '_%d.png',
            {
                killSignal: 'SIGINT'
            }
        )

        const recordProcess = this.recordProcess

        process.on('exit', function () {
            try {
                this.recordProcess.stdin.write('q\n')
            } catch (e) {}
        })
    }

    stop() {
        console.log('stopping recording')
        try {
            this.recordProcess.stdin.write('q\n')
        } catch (e) {}
    }
}

module.exports = Camcorder