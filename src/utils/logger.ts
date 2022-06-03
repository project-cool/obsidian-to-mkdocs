import { createLogger, format, transports } from 'winston'

const myFormat = format.printf((format) => {
  return `[${format.timestamp}] [${format.level}]: ${format.message}`;
});

export const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
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