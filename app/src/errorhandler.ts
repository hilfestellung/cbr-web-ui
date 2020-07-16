import { v4 } from "uuid";

import getLogger, { LoggerLevel } from "./utils/logger";
import { getLocalItem, setLocalItem } from "./utils/storage";

import globals from "./globals";

const { isProduction, version } = globals;

let clientId = getLocalItem("client_id");

if (clientId == null) {
  clientId = v4();
  setLocalItem("client_id", clientId);
}
const logger = getLogger("root", {
  level: isProduction ? LoggerLevel.Debug : LoggerLevel.Trace,
});

logger.info(
  "Running CBR-Web User Interface version",
  version,
  "in",
  isProduction ? "production" : "development",
  "mode."
);
logger.info("Your client ID:", clientId);
