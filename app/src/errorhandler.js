import getLogger, { LoggerLevel } from "./utils/logger";

import globals from "./globals";

const { isProduction, version, clientId, apiBaseUrl } = globals;

const logger = getLogger("root", {
  level: isProduction ? LoggerLevel.Debug : LoggerLevel.Trace,
});

logger.info(
  "Running CBR-Web User Interface version",
  version,
  "in",
  isProduction ? "production" : "development",
  "mode with access to the API via",
  apiBaseUrl
);
logger.info("Your client ID:", clientId);
