/// <reference types="node" />

export declare class Comms extends EventEmitter {

  /**
   * @param {XBee} xbee
   */
  constructor(xbee: any);


  send(dataType: "loc", data: any): void;
  send(dataType: "umd", data: any): void;
  send(dataType: "pre", data: any): void;
  send(dataType: "tmp", data: any): void;
  send(dataType: "target", data: any): void;
  send(dataType: "ori", data: any): void;
  send(dataType: "status", data: any): void;
  send(dataType: null, data: any): void;

  on(event: "command", listener: (...args: any[]) => void): this; 
  on(event: "data", listener: (...args: any[]) => void): this;
}

/**
 * @typedef {"loc" | "umd" | "tmp" | "pre" | "ori" | "target" | "status"} DataType
 * @typedef {any} DATA
 */