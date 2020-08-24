const express = require('express');
const app = express();
const router = require('./router');
const requestId = require('./middleware/requestId');
const jsonBodyParser = require('./middleware/jsonBodyParser');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./logger');
const config = require('./config');

// Event listeners to catch unhandled exceptions / promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', reason.stack || reason);
});

process.on('uncaughtException', err => {
  logger.error(`Uncaught Exception: ${err.message}`);
});

// Sets unique ID for request
app.use(requestId);
// Add request logger to req for convenience
app.use(requestLogger);
// Parse JSON into request body
app.use(jsonBodyParser);
// Set up routes
app.use(router);
// Custom async error handler
app.use(errorHandler);

app.listen(config.api.port, () => {
  logger.info(`Server is listening at port ${config.api.port}`);
})
