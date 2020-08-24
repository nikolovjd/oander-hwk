const Store = require('./service/store');
const config = require('../config');

const serviceContainer = {};

// Setup services here
serviceContainer.store = new Store({
  host: config.redis.host,
  port: config.redis.port
});

module.exports = serviceContainer;
