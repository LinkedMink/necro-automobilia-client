import store from "../Store";

const LOG_ENTRY_DATE_LOCALE = "en-US";

export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

const logServiceMap = new Map();
let logEntryBuffer = [];

export class LogService {
  constructor(context) {
    const state = store.getState();
    this.context = context;
    this.levelConsole = LogLevel[state.config.logLevelConsole];
    this.levelPersist = LogLevel[state.config.logLevelPersist];
  }

  static get = context => {
    const service = logServiceMap.get(context);
    if (service) {
      return service;
    }

    const newService = new LogService(context);
    logServiceMap.set(context, newService);
    return newService;
  };

  static flushBuffer = () => {
    // TODO create and connect application log service for client side logging.
    logEntryBuffer = [];
  };

  debug = object => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.DEBUG) {
      console.debug(contextMessage);
    }

    if (this.levelPersist <= LogLevel.DEBUG) {
      this.logToBuffer(contextMessage, "DEBUG");
    }
  };

  info = object => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.INFO) {
      console.info(contextMessage);
    }

    if (this.levelPersist <= LogLevel.INFO) {
      this.logToBuffer(contextMessage, "INFO");
    }
  };

  warn = object => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.WARN) {
      console.warn(contextMessage);
    }

    if (this.levelPersist <= LogLevel.WARN) {
      this.logToBuffer(contextMessage, "WARN");
    }
  };

  error = object => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.ERROR) {
      console.error(contextMessage);
    }

    if (this.levelPersist <= LogLevel.ERROR) {
      this.logToBuffer(contextMessage, "ERROR");
    }
  };

  getContextMessage = object => {
    let output;
    if (object instanceof Error) {
      output = object.stack;
    } else if (typeof object === "string") {
      output = object;
    } else {
      output = JSON.stringify(object);
    }

    return `${this.context} - ${output}`;
  };

  logToBuffer = (message, level) => {
    const dateString = new Date(Date.UTC()).toLocaleString(
      LOG_ENTRY_DATE_LOCALE
    );
    logEntryBuffer.push(`${dateString}: ${level} - ${message}`);
  };
}
