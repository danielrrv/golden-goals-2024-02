const morgan = require("morgan");
const logger = require("../utils/logger");

const httpLogger = morgan("combined", {
  stream: {
    write: (message) => logger.http(message.trim())
  }
});

function logController(req, res, next) {
  logger.info(`Controller: ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = {
  httpLogger,
  logController
};
