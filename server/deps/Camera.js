const spawn = require('child_process').spawn

const source_stream = "http://localhost:8080/?action=stream"
const destination_directory = "/home/sd"
const destination_file = "cncjs-recording_$(date +'%Y%m%d_%H%M%S').mpeg"

class Camera {
  constructor() {
    this.streaming = null
    this.save = true
  }

  start() {
    if (!this.isRunning()) {
      this.streaming = spawn("ffmpeg", ["-f", "mjpeg", "-re", "-i", source_stream, "-q:v", "10", `${destination_directory}/${destination_file}`]);
      this.save = true
    }
    return this
  }

  stop() {
    if (this.save)
      this.streaming.send("q")
  }

  kill() {
    if (!this.isRunning())
      this.streaming.kill('SIGINT')
  }

  isRunning() {
    return this.streaming.killed ? !this.streaming.killed : false
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