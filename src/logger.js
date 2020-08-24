const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        // Winston's default formatters cant handle error objects, defining custom console formatter.
        winston.format.printf(info => {
          const { level, ...rest } = info;
          let text = info.level.replace(info[Symbol.for('level')], `[${ info[Symbol.for('level')] } - ${info.timestamp}] `);
          if (rest.stack) {
            text += rest.message.replace(rest.stack.split('\n')[0].substr(7), '');
            text += '\n';
            text += `[${level}] `;
            text += rest.stack.replace(/\n/g, `\n[${level}]\t`);
          } else {
            text += rest.message;
          }
          return text;
        }),
      ),
    })
  ]
})

module.exports = logger;
