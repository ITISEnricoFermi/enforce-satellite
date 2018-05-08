const debug = require("debug")("mock:camera")
class Camera {
	constructor() {
		debug("Initialize camera")
		this.streaming = null
		this.save = true
	}

	start() {
		if (!this.isRunning()) {
			debug("Camera enabled")
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
		if (this.streaming && this.save && "send" in this.streaming) {
			debug("Stream only mode")
			this.streaming.send("q")
		}
	}

	kill() {
		if (this.streaming && "kill" in this.streaming) {
			debug("Camera killed")
			this.streaming.kill('SIGINT')
			this.streaming = null
		}
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
