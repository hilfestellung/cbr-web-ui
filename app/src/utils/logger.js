export const LoggerLevel = Object.freeze({
  Off: -1,
  Error: 0,
  Warn: 1,
  Info: 2,
  Debug: 3,
  Trace: 4,
});

const DEFAULT_CONFIG = {
  level: LoggerLevel.Info,
};

function levelToString(level) {
  switch (level) {
    case LoggerLevel.Error:
      return 'ERROR';
    case LoggerLevel.Warn:
      return ' WARN';
    case LoggerLevel.Info:
      return ' INFO';
    case LoggerLevel.Debug:
      return 'DEBUG';
    case LoggerLevel.Trace:
      return 'TRACE';
    default:
      return 'UNKNOWN';
  }
}

function formatMessage(level, name, args) {
  return [
    `${new Date().toISOString()} ${levelToString(level)} [${name}] -`,
    ...args,
  ];
}

export class Logger {
  constructor(name, config, parent) {
    this.nameHolder = name;
    this.configHolder = config;
    this.parent = parent;
  }

  get name() {
    return this.nameHolder;
  }

  get config() {
    if (this.configHolder) {
      return this.configHolder;
    }
    return this.parent != null ? this.parent.config : DEFAULT_CONFIG;
  }

  isEnabled(level) {
    return level <= this.config.level;
  }

  isErrorEnabled() {
    return LoggerLevel.Error <= this.config.level;
  }

  isWarnEnabled() {
    return LoggerLevel.Warn <= this.config.level;
  }

  isInfoEnabled() {
    return LoggerLevel.Info <= this.config.level;
  }

  isDebugEnabled() {
    return LoggerLevel.Debug <= this.config.level;
  }

  isTraceEnabled() {
    return LoggerLevel.Trace <= this.config.level;
  }

  error(...args) {
    this.doLog(LoggerLevel.Error, args);
  }

  warn(...args) {
    this.doLog(LoggerLevel.Warn, args);
  }

  info(...args) {
    this.doLog(LoggerLevel.Info, args);
  }

  log(...args) {
    this.doLog(LoggerLevel.Debug, args);
  }

  debug(...args) {
    this.doLog(LoggerLevel.Debug, args);
  }

  trace(...args) {
    this.doLog(LoggerLevel.Trace, args);
  }

  doLog(level, args) {
    setTimeout(() => {
      if (!this.isEnabled(level)) {
        return;
      }
      const message = formatMessage(level, this.name, args);
      switch (level) {
        case LoggerLevel.Error:
          console.error(...message);
          return;
        case LoggerLevel.Warn:
          console.warn(...message);
          return;
        case LoggerLevel.Info:
          console.info(...message);
          return;
        case LoggerLevel.Debug:
          console.info(...message);
          return;
        case LoggerLevel.Trace:
          console.debug(...message);
          return;
        default:
          return;
      }
    }, 0);
  }
}

function getLogger(name = 'root', config) {
  if (getLogger.instances[name] == null) {
    if (name !== 'root' && getLogger.instances.root == null) {
      getLogger.instances.root = new Logger('root', DEFAULT_CONFIG);
    }
    getLogger.instances[name] = new Logger(
      name,
      config,
      getLogger.instances.root
    );
  }
  return getLogger.instances[name];
}
getLogger.instances = {};

export default getLogger;
