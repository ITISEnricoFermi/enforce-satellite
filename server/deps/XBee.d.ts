/// <reference types="node" />
/// <reference types="serialport" />
import * as SerialPort from "serialport";
import { EventEmitter } from "events";
/**
 * @description Default delimeter for the parser to work
 */
export declare const DELIMETER: string;
/**
 * @description Default baudRate for the serial port
 */
export declare const DEFAULT_BAUDRATE: number;
/**
 * @description Wrapper class around SerialPort default methods
 * @extends {EventEmitter}
 */
export declare class XBee extends EventEmitter {
    port: SerialPort;
    private parser;
    /**
     * @description Initialize the xbee class and bind it to a serial port
     * @param {string} port The port to use
     * @param {number} baudRate The baud rate for the comunication
     */
    constructor(port: string, baudRate?: number);
    /**
     * @description Handle the parsing of the data arriving from the other xbee device
     * @param {any[]} data Data to parse
     */
    handleData(data: any[]): void;
    /**
     * @description Simple parser for the possible types of data
     * @param {String} string Raw data to parse as ```string```
     */
    check(string: string): void;
    /**
     * @description The same as .on("data", callback)
     * @param {Function} callback The callback with the data
     */
    onData(callback: (...args: any[]) => void): void;
    /**
     * @description The same as .on("command", callback)
     * @param {Function} callback The callback with the command
     */
    onCommand(callback: (...args: any[]) => void): void;
    /**
     * @description The same as .on("bno-data", callback)
     * @param {Function} callback The callback with the bnoData
     * @deprecated use ```send[LOC,UMD,PRE,TMP,ORI]``` instead
     */
    onBnoData(callback: (...args: any[]) => void): void;
    /**
     * @description The same as .on("bme-data", callback)
     * @param {Function} callback The callback with the bmeData
     * @deprecated use ```send[LOC,UMD,PRE,TMP,ORI]``` instead
     */
    onBmeData(callback: (...args: any[]) => void): void;
    /**
     * @description The same as .on("gps-data", callback)
     * @param {Function} callback The callback with the gpsData
     * @deprecated use ```send[LOC,UMD,PRE,TMP,ORI]``` instead
     */
    onGpsData(callback: (...args: any[]) => void): void;
    /**
     * @description Sends some data through the serial interface
     * @param {DATAS} data Data to send in the form of a string, buffer, or number
     * @example
     * const xbee = new XBee("port")
     * let a = "data to send"
     * xbee.sendData(a)
     */
    sendData(data: any): void;
    /**
     * @description Send commands to ```onCommand(callback)``` or ```on("command", callback)```
     * @param {string} command Command to send
     * @example
     * xbee.sendCommand("leftMotorOff")
     */
    sendCommand(command: string): void;
    /**
     * @description Send bnodata to ```onBnoData(callback)``` or ```on("bno-data", callback)```
     * @param {string} bnoData data to send
     */
    sendBnoData(bnoData: string): void;
    /**
     * @description Send bmedata to ```onBmeData(callback)``` or ```on("bme-data", callback)```
     * @param {string} bmeData data to send
     */
    sendBmeData(bmeData: string): void;
    /**
     * @description Send gpsData to ```onGpsData(callback)``` or ```on("gps-data", callback)```
     * @param {string} gpsData data to send
     */
    sendGpsData(gpsData: string): void;
    /**
     * @description Send location data
     * @param {any} data
     */
    sentLOC(data: any): void;
    /**
     * @description Send orientation data
     * @param {any} data
     */
    sendORI(data: any): void;
    /**
     * @description Send umidity data
     * @param {any} data
     */
    sendUMD(data: any): void;
    /**
     * @description Send pessure data
     * @param {any} data
     */
    sendPRE(data: any): void;
    /**
     * @description Send temperature data
     * @param {any} data
     */
    sendTMP(data: any): void;
}
