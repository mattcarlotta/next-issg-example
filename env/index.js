const dotenv = require("dotenv");
const { statSync } = require("fs");
const { resolve } = require("path");
const { logInfoMessage, logErrorMessage } = require("../logger");

const { NODE_ENV } = process.env;
const path = `env/.env.${NODE_ENV}`;

try {
  if (statSync(resolve(path)).isFile()) {
    dotenv.config({ path });

    logInfoMessage(`Using ${NODE_ENV} environment variables.`);
  }
} catch (e) {
  logErrorMessage(`Missing ${NODE_ENV} environment variables!`);
  process.exit(1);
}
