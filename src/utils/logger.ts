import * as winston from 'winston'


let todayDate = new Date();
let currentDateString = `${todayDate.getFullYear()}_${(todayDate.getMonth() + 1).toString().padStart(2, '0')}_${todayDate.getDate().toString().padStart(2, '0')}`;

const logger: winston.Logger = winston.createLogger({
    transports:
        new winston.transports.File({
            filename: `logs/log_${currentDateString}.log`,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                winston.format.align(),
                winston.format.printf(info => `[${info.level.toUpperCase()}]   ${[info.timestamp]} ${info.message}`)
            )
        }),
});

export default logger
