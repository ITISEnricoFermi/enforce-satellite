"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({
                __proto__: []
            }
            instanceof Array && function (d, b) {
                d.__proto__ = b;
            }) ||
        function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", {
    value: true
});
var SerialPort = require("serialport");
var events_1 = require("events");
// TODO: add custom emitter and delimeter for every type of data addParser(delimeter, emitter-name
/**
 * @typedef {string | Buffer | number} DATAS
 */
/**
 * @description Delimeter for the method ```sendCommand``` and ```onCommand()``` or ```on("command", callback)```
 */
var COMMAND_DELIMETER = ">$<";
/**
 * @description Default delimeter for the parser to work
 */
exports.DELIMETER = "\n"; // 0x0A
/**
 * @description Default baudRate for the serial port
 */
exports.DEFAULT_BAUDRATE = 115200;
var DELIMETERS = {
    loc: "L{",
    tmp: "T{",
    ori: "O{",
    umd: "U{",
    pre: "P{",
    tar: "G{",
    status: "W{"
};
/**
 * @description Delimeter for the ```gpsData()``` method
 * @deprecated
 */
var GPS_DELIMETER = "m-gps|";
/**
 * @description Delimeter for the ```bmeData()``` method
 * @deprecated
 */
var BME_DELIMETER = "m-bne|";
/**
 * @description Delimeter for the ```bnoData()``` method
 * @deprecated
 */
var BNO_DELIMETER = "m-bno|";
/**
 * @description Wrapper class around SerialPort default methods
 * @extends {EventEmitter}
 */
var XBee = /** @class */ (function (_super) {
    __extends(XBee, _super);
    /**
     * @description Initialize the xbee class and bind it to a serial port
     * @param {string} port The port to use
     * @param {number} baudRate The baud rate for the comunication
     */
    function XBee(port, baudRate) {
        var _this = _super.call(this) || this;
        _this.port = new SerialPort(port, {
            baudRate: baudRate || exports.DEFAULT_BAUDRATE
        });
        _this.port.on("error", function () {
            console.log("Can't connect to port: " + port);
        });
        _this.parser = new SerialPort.parsers.Readline({
            delimiter: exports.DELIMETER
        });
        _this.port.pipe(_this.parser);
        _this.parser.on("data", function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.handleData(args);
        });
        return _this;
    }
    /**
     * @description Handle the parsing of the data arriving from the other xbee device
     * @param {any[]} data Data to parse
     */
    XBee.prototype.handleData = function (data) {
        var _this = this;
        if (!data || data.length < 1)
            return;
        data.forEach(function (d) {
            _this.check(d.toString());
        });
    };
    /**
     * @description Simple parser for the possible types of data
     * @param {String} string Raw data to parse as ```string```
     */
    XBee.prototype.check = function (string) {
        if (string.indexOf(COMMAND_DELIMETER) !== -1)
            this.emit("command", string.split(COMMAND_DELIMETER)[1]);
        else if (string.indexOf(GPS_DELIMETER) !== -1)
            this.emit("gps-data", string.split(GPS_DELIMETER)[1]);
        else if (string.indexOf(BME_DELIMETER) !== -1)
            this.emit("bme-data", string.split(BME_DELIMETER)[1]);
        else if (string.indexOf(BNO_DELIMETER) !== -1)
            this.emit("bno-data", string.split(BNO_DELIMETER)[1]);
        else if (string.indexOf(DELIMETERS.loc) !== -1)
            this.emit("location", string.split(DELIMETERS.loc)[1]);
        else if (string.indexOf(DELIMETERS.ori) !== -1)
            this.emit("orientation", string.split(DELIMETERS.ori)[1]);
        else if (string.indexOf(DELIMETERS.pre) !== -1)
            this.emit("pressure", string.split(DELIMETERS.pre)[1]);
        else if (string.indexOf(DELIMETERS.tmp) !== -1)
            this.emit("temperature", string.split(DELIMETERS.tmp)[1]);
        else if (string.indexOf(DELIMETERS.umd) !== -1)
            this.emit("humidity", string.split(DELIMETERS.umd)[1]);
        else if (string.indexOf(DELIMETERS.tar) !== -1)
            this.emit("target", string.split(DELIMETERS.tar)[1])
        else if (string.indexOf(DELIMETERS.status) !== -1)
            this.emit("status", string.split(DELIMETERS.status)[1])
        else
            this.emit("data", string);
    };
    /**
     * @description The same as .on("data", callback)
     * @param {Function} callback The callback with the data
     */
    XBee.prototype.onData = function (callback) {
        this.on("data", callback);
    };
    /**
     * @description The same as .on("command", callback)
     * @param {Function} callback The callback with the command
     */
    XBee.prototype.onCommand = function (callback) {
        this.on("command", callback);
    };
    /**
     * @description The same as .on("bno-data", callback)
     * @param {Function} callback The callback with the bnoData
     * @deprecated use ```send[LOC,UMD,PRE,TMP,ORI]``` instead
     */
    XBee.prototype.onBnoData = function (callback) {
        this.on("bno-data", callback);
    };
    /**
     * @description The same as .on("bme-data", callback)
     * @param {Function} callback The callback with the bmeData
     * @deprecated use ```send[LOC,UMD,PRE,TMP,ORI]``` instead
     */
    XBee.prototype.onBmeData = function (callback) {
        this.on("bme-data", callback);
    };
    /**
     * @description The same as .on("gps-data", callback)
     * @param {Function} callback The callback with the gpsData
     * @deprecated use ```send[LOC,UMD,PRE,TMP,ORI]``` instead
     */
    XBee.prototype.onGpsData = function (callback) {
        this.on("gps-data", callback);
    };
    /**
     * @description Sends some data through the serial interface
     * @param {DATAS} data Data to send in the form of a string, buffer, or number
     * @example
     * const xbee = new XBee("port")
     * let a = "data to send"
     * xbee.sendData(a)
     */
    XBee.prototype.sendData = function (data) {
        if (this.port.writable)
            this.port.write("" + data + exports.DELIMETER);
    };

    XBee.prototype.sendTarget = function (target) {
        this.sendData("" + DELIMETERS.tar + JSON.stringify(target))
    }
    /**
     * @description Send commands to ```onCommand(callback)``` or ```on("command", callback)```
     * @param {string} command Command to send
     * @example
     * xbee.sendCommand("leftMotorOff")
     */
    XBee.prototype.sendCommand = function (command) {
        this.sendData("" + COMMAND_DELIMETER + command);
    };
    /**
     * @description Send bnodata to ```onBnoData(callback)``` or ```on("bno-data", callback)```
     * @param {string} bnoData data to send
     */
    XBee.prototype.sendBnoData = function (bnoData) {
        this.sendData("" + BNO_DELIMETER + bnoData);
    };
    /**
     * @description Send bmedata to ```onBmeData(callback)``` or ```on("bme-data", callback)```
     * @param {string} bmeData data to send
     */
    XBee.prototype.sendBmeData = function (bmeData) {
        this.sendData("" + BME_DELIMETER + bmeData);
    };
    /**
     * @description Send gpsData to ```onGpsData(callback)``` or ```on("gps-data", callback)```
     * @param {string} gpsData data to send
     */
    XBee.prototype.sendGpsData = function (gpsData) {
        this.sendData("" + GPS_DELIMETER + gpsData);
    };
    /**
     * @description Send location data
     * @param {any} data
     */
    XBee.prototype.sendLOC = function (data) {
        this.sendData("" + DELIMETERS.loc + JSON.stringify(data));
    };
    /**
     * @description Send orientation data
     * @param {any} data
     */
    XBee.prototype.sendORI = function (data) {
        this.sendData("" + DELIMETERS.ori + JSON.stringify(data));
    };
    /**
     * @description Send umidity data
     * @param {any} data
     */
    XBee.prototype.sendUMD = function (data) {
        this.sendData("" + DELIMETERS.umd + JSON.stringify(data));
    };
    /**
     * @description Send pessure data
     * @param {any} data
     */
    XBee.prototype.sendPRE = function (data) {
        this.sendData("" + DELIMETERS.pre + JSON.stringify(data));
    };
    /**
     * @description Send temperature data
     * @param {any} data
     */
    XBee.prototype.sendTMP = function (data) {
        this.sendData("" + DELIMETERS.tmp + JSON.stringify(data));
    };

    XBee.prototype.sendStatus = function (data) {
        this.sendData("" + DELIMETERS.status + JSON.stringify(data));
    };
    return XBee;
}(events_1.EventEmitter));
exports.XBee = XBee;