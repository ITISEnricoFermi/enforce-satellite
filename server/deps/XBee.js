"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var events_1 = require("events");
exports.DELIMETER = "\n"; // 0x0A
exports.DEFAULT_BAUDRATE = 9600;
/**
 * Wrapper class around SerialPort default methods
 */
var XBee = /** @class */ (function (_super) {
    __extends(XBee, _super);
    /**
     * Initialize the xbee class and bind it to a serial port
     * @param port The port to use
     * @param baudRate The baud rate for the comunication
     */
    function XBee(port, baudRate) {
        var _this = _super.call(this) || this;
        _this.port = new SerialPort(port, {
            baudRate: baudRate || exports.DEFAULT_BAUDRATE
        });
        _this.port.on("error", function () {
            console.log("Can't connect to port: " + port);
        });
        _this.parser = new SerialPort.parsers.Readline({ delimiter: exports.DELIMETER });
        _this.port.pipe(_this.parser);
        _this.parser.on("data", function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.emit("data", args);
        });
        return _this;
    }
    /**
     * The same as .on("data", callback)
     * @param callback The callback with the data
     */
    XBee.prototype.onData = function (callback) {
        this.on("data", callback);
    };
    /**
     * Sends some data through the serial interface
     * @param data The data to send in the form of a string, buffer, or number
     */
    XBee.prototype.sendData = function (data) {
        if (this.port.writable)
            this.port.write("" + data + exports.DELIMETER);
    };
    return XBee;
}(events_1.EventEmitter));
exports.XBee = (port, baudRate) => new XBee(port, baudRate);
