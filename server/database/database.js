const sqlite = require("sqlite")
const conf = require("./dbconf.json")

/**
 * @typedef {{ latitude: number, longitude: number, altitude:number }} PositionData
 * @typedef {{ w: number, x: number, y: number, z: number, scale: number }} OrientationData
 */

/**
 * @description Database class, a wrapper for sqlite3 methods
 */
class DataBase {
  /**
   * @constructor Connects to the specified database
   * @param {string} database path to database
   */
  constructor(database) {
    this.db = database
    this.dbPromise = sqlite.open(this.db)
    this.mission = "enf"
  }

  /**
   * @description To call before the start of every mission to generate the mission id
   */
  startMission() {
    let now = new Date().getTime().toString()
    this.mission += now
    this.dbPromise.then(db => {
      return db.run(`INSERT INTO ${conf.TABLES_NAMES.mission} (missionID, time) VALUES (?, ?)`, this.mission, now)
    }).catch(err => console.log("Mysqli error", err))
    this.dbPromise = sqlite.open(this.db)
  }

  /**
   * @param {PositionData} pos Postion data
   */
  insertPos(pos) {
    this.dbPromise.then(db => { 
      return db.run(`INSERT INTO ${conf.TABLES_NAMES.gps} (lon, lat, alt, missionID, time) VALUES (?, ?, ?, ?, ?)`,
        pos.longitude, pos.latitude, pos.altitude, this.mission, new Date().getTime())
    }).catch(err => console.log("Mysqli error", err))
    this.dbPromise = sqlite.open(this.db)
  }

  /**
   * @param {number} tempD 
   */
  insertTemp(tempD) {
    this.dbPromise.then(db => {
      return db.run(`INSERT INTO ${conf.TABLES_NAMES.temp} (temp, missionID, time) VALUES (?, ?, ?)`, tempD,
        this.mission, new Date().getTime())
      }).catch(err => console.log("Mysqli error", err))
      this.dbPromise = sqlite.open(this.db)
  }

  /**
   * @param {number} umidD 
   */
  insertUmid(umidD) {
    this.dbPromise.then(db => {
      return db.run(`INSERT INTO ${conf.TABLES_NAMES.umid} (umidita, missionID, time) VALUES (?, ?, ?)`, umidD,
        this.mission, new Date().getTime())
      }).catch(err => console.log("Mysqli error", err))
      this.dbPromise = sqlite.open(this.db)
  }

  /**
   * @param {number} presD 
   */
  insertPres(presD) {
    this.dbPromise.then(db => {
      return db.run(`INSERT INTO ${conf.TABLES_NAMES.pres} (pressione, missionID, time) VALUES (?, ?, ?)`, presD,
        this.mission, new Date().getTime())
    }).catch(err => console.log("Mysqli error", err))
    this.dbPromise = sqlite.open(this.db)
  }

  /**
   * @param {OrientationData} ori 
   */
  insertOri(ori) {
    this.dbPromise.then(db => {
      return db.run(`INSERT INTO ${conf.TABLES_NAMES.gyro} (x, y, z, w, scale, missionID, time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ori.x,
        ori.y, ori.z, ori.w, 1, this.mission, new Date().getTime())
    }).catch(err => console.log("Mysqli error", err))
    this.dbPromise = sqlite.open(this.db)
  }
}


module.exports = DataBase