const debug = require("debug")("mock:camera")
class Camera {
	constructor() {
		this.streaming = null
		this.save = true
	}

	start() {
		if (!this.isRunning()) {
			this.streaming = {
				killed: false,
				kill() {
					this.killed = true
				},
				send(message) {
					debug(`Message to camera process: ${message}`);
				}
			}
			this.save = true
		}
		return this
	}

	stop() {
		if (this.save)
			this.streaming.send("q")
	}

	kill() {
		if ("kill" in this.streaming)
			this.streaming.kill('SIGINT')
	}

	isRunning() {
		return this.streaming ? !this.streaming.killed : false
	}

	isSaving() {
		return save
	}

}

module.exports = Camera



/*
# [Varables]
source_stream="http://localhost:8080/?action=stream"
destination_directory="/home/sd"
destination_file="cncjs-recording_$(date +'%Y%m%d_%H%M%S').mpeg"

# Recored Stream w/ ffmpeg
ffmpeg -f mjpeg -re -i "${source_stream}" -q:v 10 "${destination_directory}/${destination_file}"

*/
