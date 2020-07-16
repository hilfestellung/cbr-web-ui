export enum LoggerLevel {
  Off = -1,
  Error = 0,
  Warn = 1,
  Info = 2,
  Debug = 3,
  Trace = 4,
}

export interface LoggerConfig {
  level: LoggerLevel;
}

const DEFAULT_CONFIG: LoggerConfig = {
  level: LoggerLevel.Info,
};

function levelToString(level: LoggerLevel) {
  switch (level) {
    case LoggerLevel.Error:
      return "ERROR";
    case LoggerLevel.Warn:
      return "WARN";
    case LoggerLevel.Info:
      return "INFO";
    case LoggerLevel.Debug:
      return "DEBUG";
    case LoggerLevel.Trace:
      return "TRACE";
  }
}

function formatMessage(level: LoggerLevel, args: any[]): any[] {
  return [`${new Date().toISOString()} [${levelToString(level)}] -`, ...args];
}

export class Logger {
  private configHolder: LoggerConfig | undefined;
  constructor(
    public name: string,
    config?: LoggerConfig,
    private parent?: Logger
  ) {
    this.configHolder = config;
  }

  get config(): LoggerConfig {
    if (this.configHolder) {
      return this.configHolder;
    }
    return this.parent != null ? this.parent.config : DEFAULT_CONFIG;
  }

  isEnabled(level: LoggerLevel) {
    return level <= this.config.level;
  }

  error(...args: any[]) {
    this.doLog(LoggerLevel.Error, args);
  }

  warn(...args: any[]) {
    this.doLog(LoggerLevel.Warn, args);
  }

  info(...args: any[]) {
    this.doLog(LoggerLevel.Info, args);
  }

  debug(...args: any[]) {
    this.doLog(LoggerLevel.Debug, args);
  }

  trace(...args: any[]) {
    this.doLog(LoggerLevel.Trace, args);
  }

  private doLog(level: LoggerLevel, args: any[]) {
    setTimeout(() => {
      if (!this.isEnabled(level)) {
        return;
      }
      const message = formatMessage(level, args);
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
      }
    }, 0);
  }
}

function getLogger(name = "root", config?: LoggerConfig): Logger {
  if (getLogger.instances[name] == null) {
    if (name !== "root" && getLogger.instances.root == null) {
      getLogger.instances.root = new Logger("root", DEFAULT_CONFIG);
    }
    getLogger.instances[name] = new Logger(
      name,
      config,
      getLogger.instances.root
    );
  }
  return getLogger.instances[name];
}
getLogger.instances = {} as any;

export default getLogger;
