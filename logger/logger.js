const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`
        })
    ),
    transports: [
        new winston.transports.Console({format: winston.format.simple()}),
        new winston.transports.File({filename: 'combined.log'}),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
})

module.exports = logger