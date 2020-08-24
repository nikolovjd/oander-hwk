const { promisify } = require('util');
const redis = require('redis');
const { NotFoundError } = require('../../errors/httpErrors');

class Store {
  constructor({ host, port }) {
    this.logger = require('../../logger');
    this.client = redis.createClient({
      host,
      port
    });

    // Promisify redis functions
    this.client.get = promisify(this.client.get).bind(this.client);
    this.client.set = promisify(this.client.set).bind(this.client);
    this.client.del = promisify(this.client.del).bind(this.client);
    this.client.exists = promisify(this.client.exists).bind(this.client);

    this.logger.debug('Store service instantiated', { service: 'store', host, port })
  }

  async get(key, logger = this.logger) {
    const data = await this.client.get(key);
    if (!data) {
      logger.warn(`Attempting to get nonexistent key "${key}"`);
      throw new NotFoundError();
    }
    const buff = Buffer.from(data, 'base64');
    const text = buff.toString('utf8');
    return JSON.parse(text);
  }

  async set(key, value, logger = this.logger) {
    const text = JSON.stringify(value);
    const buff = Buffer.from(text);
    return this.client.set(key, buff.toString('base64'));
  }

  async del(key, logger = this.logger) {
    const exists = await this.client.exists(key);
    if (!exists) {
      logger.warn(`Attempting to delete nonexistent key "${key}"`);
      throw new NotFoundError();
    }
    return this.client.del(key);
  }
}

module.exports = Store;
