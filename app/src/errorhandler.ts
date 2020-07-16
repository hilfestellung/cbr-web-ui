import { v4 } from "uuid";

import getLogger, { LoggerLevel } from "./utils/logger";
import { getLocalItem, setLocalItem } from "./utils/storage";

const isProduction = false;
const version = "1.0";
let clientId = getLocalItem("client_id");

if (clientId == null) {
  clientId = v4();
  setLocalItem("client_id", clientId);
}
const logger = getLogger("root", {
  level: isProduction ? LoggerLevel.Debug : LoggerLevel.Debug,
});

logger.info("Running CBR-Web User Interface", version);
logger.info("Your client ID:", clientId);
