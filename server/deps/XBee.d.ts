/// <reference types="node" />
/// <reference types="serialport" />
import * as SerialPort from "serialport";
import { EventEmitter } from "events";
export declare const DELIMETER: string;
export declare const DEFAULT_BAUDRATE: number;
/**
 * Wrapper class around SerialPort default methods
 */
export declare class XBee extends EventEmitter {
    port: SerialPort;
    private parser;
    /**
     * Initialize the xbee class and bind it to a serial port
     * @param port The port to use
     * @param baudRate The baud rate for the comunication
     */
    constructor(port: string, baudRate?: number);
    /**
     * The same as .on("data", callback)
     * @param callback The callback with the data
     */
    onData(callback: (...args: any[]) => void): void;
    /**
     * Sends some data through the serial interface
     * @param data The data to send in the form of a string, buffer, or number
     */
    sendData(data: string | Buffer | number): void;
}
