import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();

const customLogger = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    }
}

let logger;

if (process.env.ENVIROMENT === 'production') {
  logger = winston.createLogger({
    levels: customLogger.levels,
    transports: [
      new winston.transports.Console({
        level: 'debug',
      }),

      new winston.transports.File({
        filename:"./errors.log",
        level:'error',
        format: winston.format.simple()
      })
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLogger.levels,
    transports: [
      new winston.transports.Console({
        level: 'info',
      }),

      new winston.transports.File({
        filename:"./errors.log",
        level:'error',
        format: winston.format.simple()
      })
    ],
  });
}

export default logger;