import { createLogger, format, transports } from 'winston'

const myFormat = format.printf((format) => {
  return `[${format.timestamp}] [${format.level}]: ${format.message}`;
});

let consoleLoggerLevel: string = 'info'
switch(process.argv[3]) { //  console logger level
  case 'info':
  case 'debug':
  case 'error':
    consoleLoggerLevel = process.argv[3]
    break;
}

export const logger = createLogger({
  transports: [
    new transports.Console({
      level: consoleLoggerLevel,
      format: format.combine(
        format.colorize(),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
      )
    }),
    new transports.File({
      filename: 'logs/dev.log',
      level: 'debug',
      format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
      ),
    }),
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
      ),
    })
  ]
});

logger.info(`Console logger level: ${consoleLoggerLevel}`)