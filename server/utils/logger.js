const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  });

  
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Log levels: error, warn, info, http, verbose, debug, silly
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} [${info.level}]: ${info.message}`
        )
      ),
    }),
    new transports.File({ filename: 'logs/app.log' }),
    dailyRotateFileTransport,
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' }),
  ],
});

module.exports = logger;
