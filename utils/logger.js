const { createLogger, format, transports } = require('winston');
require('dotenv').config();

const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message, stack }) => {
            return stack
                ? `${timestamp} [${level}]: ${message} - ${stack}` // print stack trace for errors
                : `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console() // log to console
    ]
});

// function to log any type of information
const logInfo = (req, type) => {
    const message = `${req.method} ${req.originalUrl} - ${req.ip}
    ************************************************************`;
    switch (type) {
        case 'info':
            logger.info(message);
            break;
        case 'error':
            logger.error(message);
            break;
        case 'warn':
            logger.warn(message);
            break;
        default:
            logger.info(message);
            break;
    }
}

// log socket info
const logSocketInfo = (socket, type, event) => {
    const message = `Socket:${socket.id} - event:${event} - address:${socket.handshake.address}
    ************************************************************`;
    switch (type) {
        case 'info':
            logger.info(message);
            break;
        case 'error':
            logger.error(message);
            break;
        case 'warn':
            logger.warn(message);
            break;
        default:
            logger.info(message);
            break;
    }
}

module.exports = { logger, logInfo, logSocketInfo };