const path = require('path')
const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

const directory = path.join(__dirname, '../logs')

const errorTransport = new transports.DailyRotateFile({
  filename: path.join(directory, 'error-%DATE%.log'),
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const combinedTransport = new transports.DailyRotateFile({
  filename: path.join(directory, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '3d'
})

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} | ${info.module} | ${info.level}: ${info.message}`)),
  transports: [errorTransport, combinedTransport]
})

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} | ${info.module} | ${info.level}: ${info.message}`))
  }))
}

module.exports = logger
