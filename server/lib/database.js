const path = require("path")
const log = require("simple-node-logger").createRollingFileLogger({
  errorEventName: 'error',
  logDirectory: path.join(__dirname, 'logs'), // NOTE: folder must exist and be writable...
  fileNamePattern: 'enforce-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
})
const sqlite3 = require("sqlite3").verbose()
const conf = require("./dbconf.json")
const {
  EventEmitter
} = require("events")

/**
 * @typedef {{ latitude: number, longitude: number, altitude:number }} PositionData
 * @typedef {{ w: number, x: number, y: number, z: number, scale: number }} OrientationData
 */

/**
 * @description Database class, a wrapper for sqlite3 methods
 */
class DataBase extends sqlite3.Database {
  /**
   * @constructor Connects to the specified database
   * @param {string} database path to database
   */
  constructor(database) {
    super(database ? path.join(__dirname, database) : ':memory:', (err) => {
      if (err) return this.emit("error", err)
      log.log("info", "Database open.")
    })
    this.mission = "enf"

    this.on("error", err => {
      log.log("warn", err.message)
    })
  }

  /**
   * @description To call before the start of every mission to generate the mission id
   */
  startMission() {
    this.mission += new Date().getTime().toString()
    this.serialize(() => {
      this.run(`INSERT INTO ${conf.TABLES_NAMES.mission} (missionID, time) VALUES (?, ?)`, this.mission, new Date().getTime(), (err) => {
        if (err) return this.emit("error", err)
        log.log("info", `Mission ${this.mission} started!`)
      })
    })
  }

  /**
   * @param {PositionData} pos Postion data
   */
  insertPos(pos) {
    this.serialize(() => {
      this.run(`INSERT INTO ${conf.TABLES_NAMES.gps} (lon, lat, alt, missionID, time) VALUES (?, ?, ?, ?, ?)`,
        pos.longitude, pos.latitude, pos.altitude, this.mission, new Date().getTime(), (err) => {
          if (err) return this.emit("error", err)
          log.log("info", `Gps data saved!`)
        })
    })
  }

  /**
   * @param {number} tempD 
   */
  insertTemp(tempD) {
    this.serialize(() => {
      this.run(`INSERT INTO ${conf.TABLES_NAMES.temp} (temp, missionID, time) VALUES (?, ?, ?)`, tempD,
        this.mission, new Date().getTime(), (err) => {
          if (err) return this.emit("error", err)
          log.log("info", `Temps data saved!`)
        })
    })
  }

  /**
   * @param {number} umidD 
   */
  insertUmid(umidD) {
    this.serialize(() => {
      this.run(`INSERT INTO ${conf.TABLES_NAMES.umid} (umidita, missionID, time) VALUES (?, ?, ?)`, umidD,
        this.mission, new Date().getTime(), (err) => {
          if (err) return this.emit("error", err)
          log.log("info", `Umidity data saved!`)
        })
    })
  }

  /**
   * @param {number} presD 
   */
  insertPres(presD) {
    this.serialize(() => {
      this.run(`INSERT INTO ${conf.TABLES_NAMES.pres} (pressione, missionID, time) VALUES (?, ?, ?)`, presD,
        this.mission, new Date().getTime(), (err) => {
          if (err) return this.emit("error", err)
          log.log("info", `Pressure data saved!`)
        })
    })
  }

  /**
   * @param {OrientationData} ori 
   */
  insertOri(ori) {
    this.serialize(() => {
      this.run(`INSERT INTO ${conf.TABLES_NAMES.gyro} (x, y, z, w, scale, missionID, time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ori.x,
        ori.y, ori.z, ori.w, ori.scale, this.mission, new Date().getTime(), (err) => {
          if (err) return this.emit("error", err)
          log.log("info", `Orientation data saved!`)
        })
    })
  }
}


module.exports = {
  DataBase,
  logger: log
}